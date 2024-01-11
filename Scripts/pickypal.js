window.onload=pageReady;
function pageReady(){
    //Hiding all pages except page 1 initially
    $('.countPage').hide();
    $('.namePage').hide();
    $('.taskPage').hide();
    $('.resultPage').hide();
    $('#countValidation').hide();

    //declaring the variables
    var count;
    var name =[];
    var task=[];
    var i;
    var shuffledTask=[];
    var shuffledName=[];
    
    //declaring form handlers
    var countForm = document.forms.form_count;
    var nameForm=document.forms.form_names;
    var taskForm=document.forms.form_task;
    var resultForm=document.forms.form_result;
    
    //getting elements from HTML 
    var namelist=document.getElementById('nameList');
    var tasklist=document.getElementById('taskList');
    var names=document.getElementById('names');
    var tasks=document.getElementById('tasks');
    
    //calling functions for each buttons
    countForm.onsubmit=processCount;
    nameForm.onsubmit=processNames;
    taskForm.onsubmit=processtask;
   resultForm.onsubmit=processresult;
//Button Navigation from page to page

//Page1
    $('#page1Button').on('click',function(){
        $('.countPage').show();
        $('.page1').hide();
    });

// Page 2 begins
    $('#countBack').on('click',function(){
        $('.page1').show();
        $('.countPage').hide();
    });
    //function to create text boxes for name list and task list based on the count value input 
    function processCount(){
        namelist.innerHTML="";
        tasklist.innerHTML="";
        count= countForm.f_Count.value;
        console.log(count);
        // countPage form validation
        if((count===0)||(count==="")||(isNaN(count))||(count==" ")){
            $('#countValidation').show();
            countForm.f_Count.focus();
            
        }
        else{
            for(i=0;i<count;i++){
                namelist.innerHTML+= '<p id="nameValidation'+i+'"class="validation">Please enter name</p><p><label for="name' +i + '"class="Label">Name '+ (i+1)+':</label><p><input type="text" id="name' + i + '" name="f_Name' + i + '"class="textbox" required/></p></p>'  
                tasklist.innerHTML+='<p id="taskValidation'+i+'"class="validation">Please enter task</p><p id="tasks"><label for="tasks'+i+'"class="Label">Task '+ (i+1)+':</label><p><input type="text" id="tasks'+i+'" name="f_tasks'+i+'"class="textbox"required/></p></p>'
                $('#nameValidation'+i).hide(); 
                $('#taskValidation'+i).hide();  
            }
            $('.namePage').show();
            $('.countPage').hide();
        }
           
        return false;
        }
   //page2 ends
   //Page 3 begins 
    $('#nameBack').on('click',function(){
        $('.namePage').hide();
        $('.countPage').show();
        return false;
    });
//function to get the names and store in name Array
function processNames(){
    var flag=0;
    for(i=0;i<count;i++){
        name[i] = nameForm.elements['f_Name' + i].value;
        //form validation for name input
        if(name[i]===""){
            $('#nameValidation'+i).show();
            nameForm.elements['f_Name' + i].focus();
            flag=1;
            return false;
        }
    }
    if(flag===0){
        $('.namePage').hide();
        $('.taskPage').show();
    }
    return false;
}
//Page 3 ends
//Page 4 begins
    $('#taskBack').on('click',function(){
        $('.taskPage').hide();
        $('.namePage').show();
        return false;
    });
// function to get task list and store it in an array task
function processtask(){
    var flag=0;
    for(i=0;i<count;i++){
        //form validation for task
        task[i] = taskForm.elements['f_tasks' + i].value;
        if(task[i]===""){
            $('#taskValidation'+i).show();
            taskForm.elements['f_tasks' + i].focus();
            flag=1;
            return false;
        }     
    }
    
    if(flag===0){
        $('.taskPage').hide();
        $('.resultPage').show();

        //Generating shuffled array of name and task using shuffleArray()
        shuffledName = shuffleArray(name);
        shuffledTask = shuffleArray(task);
        
        console.log("name="+name);
        console.log("shuffledname="+shuffledName);
        console.log("task"+task);
        console.log("shuffledtask"+shuffledTask);
        //displaying the list of arrays in the page
          for(var i=0;i<count;i++){
                names.innerHTML+='<p class="items">'+shuffledName[i]+'</p>';
                tasks.innerHTML+='<p class="items">'+shuffledTask[i]+'</p>';
          }
    }
    return false;

}
//page 4 ends
//page 5 begins
//when user clicks on regenerate button
function processresult(){
    names.innerHTML='';
        tasks.innerHTML='';
    shuffledName = shuffleArray(shuffledName);
    shuffledTask = shuffleArray(shuffledTask);
    for(var i=0;i<count;i++){
        names.innerHTML+='<p class="items">'+shuffledName[i]+'</p>';
        tasks.innerHTML+='<p class="items">'+shuffledTask[i]+'</p>';
  }
  shuffledName = shuffleArray(shuffledName);
  shuffledTask = shuffleArray(shuffledTask);
    return false;
}

   
    $('#goHome').on('click',function(){
        location.reload();
        return false;
    });
//page 5 ends

//function to shuffle the elements in an array
function shuffleArray(array) {
        var k=0;
        const shuffledArray = [...array];
        for (var i = count; i >0; i--) {
          var j = Math.floor(Math.random()*i);
          shuffledArray[k]=array[j];
         
          if(j===0){
            var array=array.slice(1);
          }
          else{
            var array = array.slice(0, j).concat(array.slice(j+1));
          }
          k=k+1;
          
        }
        return shuffledArray;
      }

}