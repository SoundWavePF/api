import { Router } from "express";
import db from "../../models/db";

export const playlistRouter = Router();

playlistRouter.post("/", async (req, res) => {
    try {
        const { email } = req.body;
        console.log(req.body);
        const user = await db.user.findOne({ where: { email: email } });

        const userPlaylist = await db.playlist.findAll({
            attributes: { exclude: ["userId"] },
            where: { userId: user.id },
        });
        return res.send(userPlaylist);
    } catch (e: any) {
        return res.send({ message: e.message });
    }
});

playlistRouter.get("/all", async (_req, res) => {
    try {
        const playlistOnDb = await db.playlist.findAll({
            attributes: { exclude: ["userId"] },
            include: [
                {
                    model: db.user,
                    attributes: { exclude: ["email", "password"] },
                },
            ],
        });
        return res.send(playlistOnDb);
    } catch (e: any) {
        return res.send({ message: e.message });
    }
});
playlistRouter.post("/create", async (req, res) => {
    const { email, playlistName } = req.body;

    try {
        const user = await db.user.findOne({ where: { email: email } });
        const playlistCreated = await db.playlist.create({
            name: playlistName,
        });
        user.addPlaylist(playlistCreated);

        return res.send(playlistCreated);
    } catch (e: any) {
        return res.send({ message: e.message });
    }
});

playlistRouter.post("/add", async (req, res) => {
    const { playlistId, songId } = req.body;
    try {
        const playlist = await db.playlist.findOne({
            where: { id: playlistId },
        });
        const song = await db.song.findOne({ where: { id: songId } });
        playlist.addSong(song);
        song.added_to_playlists += 1;
        song.save();
        return res.send({
            message: `song: ${song.name} has been added to playlist: ${playlist.name}`,
        });
    } catch (e: any) {
        // console.log(e)
        return res.send({ message: e.message });
    }
});

playlistRouter.post("/remove", async (req, res) => {
    const { playlistId, songId } = req.body;
    try {
        const playlist = await db.playlist.findOne({
            where: { id: playlistId },
        });
        const song = await db.song.findOne({ where: { id: songId } });
        playlist.removeSong(song);
        song.added_to_favorites -= 1;
        song.save();
        return res.send({
            message: `song: ${songId} has been removed from playlist: ${playlist.name}`,
        });
    } catch (e) {
        return res.send(e);
    }
});

playlistRouter.post("/delete", async (req, res) => {
    const { playlistId } = req.body;
    try {
        const playlist = await db.playlist.findOne({
            where: { id: playlistId },
            include: [{ model: db.song }],
        });
        await Promise.all(
            playlist.songs.map(async (song: any) => {
                const songToDelete = await db.song.findOne({
                    where: { id: song.id },
                });
                songToDelete.added_to_playlists -= 1;
                songToDelete.save();
            })
        );
        playlist.destroy();
        return res.send({
            message: `playlist with id: ${playlistId} has been deleted`,
        });
    } catch (e) {
        return res.send(e);
    }
});

playlistRouter.get("/:playlistId", async (req, res) => {
    const { playlistId } = req.params;
    try {
        const playlistOnDb = await db.playlist.findOne({
            attributes: { exclude: ["userId"] },
            where: { id: playlistId },
            include: [
                {
                    model: db.user,
                    attributes: { exclude: ["email", "password"] },
                },
                {
                    model: db.song,
                    attributes: {
                        exclude: [
                            "artist_id_reference",
                            "genre_id_reference",
                            "album_id_reference",
                            "albumId",
                        ],
                    },
                    include: [
                        { model: db.album, attributes: ["name", "id"] },
                        { model: db.artist, attributes: ["name", "id"] },
                    ],
                },
            ],
        });
        return res.send(playlistOnDb);
    } catch (e: any) {
        return res.send({ message: e.message });
    }
});
