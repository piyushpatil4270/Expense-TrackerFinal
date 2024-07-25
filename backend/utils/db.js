const Sequelize = require("sequelize")

const sequelize=new Sequelize('expense_tracker','root','Piyush@nyc85',{dialect:'mysql',host:'localhost'})


module.exports=sequelize