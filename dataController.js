    var dataController = (function() {

        const avaliableCourses = require('./data');
            let findCourse = (code) =>{
            const searchedCourse = avaliableCourses.find(course => course.code === code);
            return searchedCourse;
        };

        let  writeFile = (course, studentName, studentId) =>{
            const fs = require('fs');
            let{ code, name,hours, price,credits}  = course;

            let texto_inscripcion = '\nSe ha inscrito a el estudiante: '+ studentName +' \n con cédula: ' + studentId + '\n'+
            " en el curso: "+ name + "\n con una duracion de : "+hours + " horas,\n  un costo de : $" + price+ "pesos y " + credits + " creditos\n";
            
            fs.appendFile('inscripcion-' + studentId + '.txt',texto_inscripcion,(err)=>{
                if(err) throw(err);
                console.log('se ha creado el archivo de inscripción');
            });
        }

        return {
            getCourses: function(){
                return avaliableCourses;
            },
            subscribeStudent(args){
                searchedCourse = findCourse(args.c);
                
                if(searchedCourse){
                    let{ code, name,hours, price,credits}  = searchedCourse;
                    console.log("\nSe te inscribira en el curso: "+ code +" "+  name + " -duracion "+ hours + " -costo: "+price+ " -creditos:"+credits );
                    writeFile(searchedCourse, args.n, args.s);
                    return true;
                }else{
                    console.log("\nNo se encontro ningún curso con el codigo: "+  args.c + "\nEste es el listado de cursos ");
                    return false;
                }
            }
        }
    })();

    const opciones ={
        code:{
            demand: true,
            alias: 'c'
        },
        name:{
            demand: true,
            alias: 'n'
        },
        studentId:{
            demand: true,
            alias: 's'
        },
    }

    const argv = require('yargs')
                .command('subscribe','Inscribir un estudiante en el curso',opciones)
                .argv
    module.exports = {dataController, argv };