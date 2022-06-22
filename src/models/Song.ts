'use strict';

import {
  Model
} from 'sequelize';

interface SongAttributes {
  id: string;
  dz_Id: number;
  name: string;
  preview: string;
  image_small: string;
  image_medium: string;
  image_big: string;
  reproductions: number;
  added_to_favorites: number;
  added_to_playlists: number;
  duration: number;
  type: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class song extends Model<SongAttributes>
    implements SongAttributes {
    id!: string;
    dz_Id!: number;
    name!: string;
    preview!: string;
    image_small!: string;
    image_medium!: string;
    image_big!: string;
    reproductions!: number;
    added_to_favorites!: number;
    added_to_playlists!: number;
    duration!: number;
    type!: string;
    static associate(models: any) {
      song.belongsTo(models.album)
      song.belongsTo(models.genre)
      song.belongsToMany(models.artist, {
        through: 'contributors'
      })
      song.belongsToMany(models.user, {
        through: 'favorites'
      })
      song.belongsToMany(models.playlist, {
        through: 'playlist_song'
      })
    }
  };
  song.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    dz_Id: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    preview: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image_small: {
      type: DataTypes.STRING,
      defaultValue: 'https://img.freepik.com/free-photo/vintage-cassette-tape-orange-background_23-2148695246.jpg'
    },
    image_medium: {
      type: DataTypes.STRING,
      defaultValue: 'https://img.freepik.com/free-photo/vintage-cassette-tape-orange-background_23-2148695246.jpg'
    },
    image_big: {
      type: DataTypes.STRING,
      defaultValue: 'https://img.freepik.com/free-photo/vintage-cassette-tape-orange-background_23-2148695246.jpg'
    },
    reproductions: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    added_to_favorites: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    added_to_playlists: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: 'track'
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'song',
  });
  return song;
};