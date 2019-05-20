    const {dataController, argv }= require('./dataController');

    var controller = (function(ctrl){
        let  courses = ctrl.getCourses();
        let validData = (attr)=>{
            console.log(attr);
            if(attr.s && attr.n && attr.c){
                return true;
            }
            return false;
        };

        return {
            init: function(args){        
                if( !validData(args)){
                    console.log("Su oferta de materias es: \n/////////////////////////");
                    this.showCourses();
                }else{        
                    if(ctrl.subscribeStudent(args)){
                        console.log("***************** \nInscripcion realizada");
                    }else{
                        console.log("///////////////////////");
                        this.showCourses();
                    }
                }
            },

            showCourses: function() {
                for (i = 0; i < courses.length; ++i) {
                    (function (i) {
                        setTimeout(function () {
                          console.log("Codigo: "+courses[i].code +
                           " -Nombre:  " + courses[i].name+ " -Duración: " + 
                           courses[i].hours+ " Horas -Valor: $" + courses[i].price+ 
                           " -Creditos: " +courses[i].credits);
                        }, 2000*i);
                      })(i);
                  }
            }
        }


    })(dataController);

controller.init(argv);
