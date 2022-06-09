'use strict';

import {
  Model
} from 'sequelize';

interface SongAttributes {
    id: number;
    dzId: string;
    title: string;
    preview: string;
    cover_small: string;
    cover_medium: string;
    cover_big: string;
    cover_xl: string;
    reproductions: number;
    duration: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Song extends Model<SongAttributes> 
    implements SongAttributes{
            id!: number;
            dzId!: string;
            title!: string;
            preview!: string;
            cover_small!: string;
            cover_medium!: string;
            cover_big!: string;
            cover_xl!: string;
            reproductions!: number;
            duration!: number;
             static associate(models: any){
                 Song.belongsTo(models.Artist)
                 Song.belongsTo(models.Album)
                 Song.belongsTo(models.Genre)
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
        autoIncrement: true,
        primaryKey: true
        },
    dzId:{
        type: DataTypes.STRING,
      },
    title:{
        type: DataTypes.STRING,
        },
    preview: {
      type: DataTypes.STRING,
    },
      cover_small:{
          type: DataTypes.STRING
      },
      cover_medium:{
          type: DataTypes.STRING
      },
      cover_big:{
          type: DataTypes.STRING
      },
      cover_xl:{
          type: DataTypes.STRING
      },
    reproductions:{
        type: DataTypes.INTEGER,
    },
    duration:{
        type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Song',
  });
  return Song;
};