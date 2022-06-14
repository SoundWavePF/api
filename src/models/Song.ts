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
  duration: number;
  type: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Song extends Model<SongAttributes>
    implements SongAttributes {
    id!: string;
    dz_Id!: number;
    name!: string;
    preview!: string;
    image_small!: string;
    image_medium!: string;
    image_big!: string;
    reproductions!: number;
    duration!: number;
    type!: string;
    static associate(models: any) {
      Song.belongsTo(models.Album)
      Song.belongsTo(models.Genre)
      Song.belongsToMany(models.Artist, {
        through: 'Contributors'
      })
      Song.belongsToMany(models.User, {
        through: 'Favorites'
      })
      Song.belongsToMany(models.Playlist, {
        through: 'Playlist_Song'
      })
    }
  };
  Song.init({
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
    reproductions: {
      type: DataTypes.INTEGER,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Song',
  });
  return Song;
};