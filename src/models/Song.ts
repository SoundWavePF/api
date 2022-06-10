'use strict';

import {
  Model
} from 'sequelize';

interface SongAttributes {
    id: number;
    title: string;
    artist: string;
    preview: string;
    image_small: string;
    image_medium: string;
    image_big: string;
    reproductions: number;
    duration: number;
    genre: string;
    album: string;
    artist_id_reference: string;
    genre_id_reference: string;
    album_id_reference: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Song extends Model<SongAttributes> 
    implements SongAttributes{
            id!: number;
            title!: string;
            artist!: string;
            preview!: string;
            image_small!: string;
            image_medium!: string;
            image_big!: string;
            reproductions!: number;
            duration!: number;
            genre!: string;
            album!: string;
            artist_id_reference!: string;
            genre_id_reference!: string;
            album_id_reference!: string;
             static associate(models: any){
                 Song.belongsTo(models.Artist)
                 Song.belongsTo(models.Genre)
                 Song.belongsTo(models.Album)
                 Song.belongsToMany(models.User, {
                     through: 'Favorites'
                 })
                 Song.belongsToMany(models.Playlist, {
                     through: 'Playlist_Song'
                 })
            }
  };
  Song.init({
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
        },
    title:{
        type: DataTypes.STRING,
        allowNull: false,
        },
    artist:{
        type: DataTypes.STRING,
        allowNull: false,
        },
    preview: {
      type: DataTypes.STRING,
      allowNull: false
    },
     image_small: {
        type: DataTypes.STRING,
        allowNull: false
    },
     image_medium: {
        type: DataTypes.STRING,
        allowNull: false
    },
     image_big: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reproductions:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    duration:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    genre:{
      type: DataTypes.STRING,
      allowNull: false,
      },
    album:{
      type: DataTypes.STRING,
      allowNull: false,
      },
    artist_id_reference:{
      type: DataTypes.INTEGER,
      allowNull: false,
      },
    genre_id_reference: {
      type: DataTypes.INTEGER,
      allowNull: false,
      },
    album_id_reference: {
      type: DataTypes.INTEGER,
      allowNull: false,
      }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Song',
  });
  return Song;
};