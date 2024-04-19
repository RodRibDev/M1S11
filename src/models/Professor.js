const { DataTypes } = require("sequelize");
const { connection } = require("../database/connection");

const Professor = connection.define('professores', {
    nome: {
        type: DataTypes.STRING
    },
    curso: {
        type: DataTypes.STRING
    },

})

module.exports = Professor