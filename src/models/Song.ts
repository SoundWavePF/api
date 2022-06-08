'use strict';

import {
  Model
} from 'sequelize';

interface SongAttributes {
    id: number;
    title: string;
    preview: string;
    image: string;
    reproductions: number;
    duration: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Song extends Model<SongAttributes> 
    implements SongAttributes{
            id!: number;
            title!: string;
            preview!: string;
            image!: string;
            reproductions!: number;
            duration!: number;
             static associate(models: any){
                Song.belongsTo(models.Artist, models.Album)
                Song.belongsToMany(models.User, {
                through: 'Favorites'
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
    preview: {
      type: DataTypes.STRING,
      allowNull: false
    },
     image: {
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
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Song',
  });
  return Song;
};