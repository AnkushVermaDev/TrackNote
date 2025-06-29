import checkpenmode from './DrawingPen.js'
import getselectedItemInSetting from './Shapes.js'

let navbar = document.querySelector('.navbar');
let threeverticaldots  = document.querySelector('.fa-ellipsis-vertical')
let filecontainer  = document.querySelector('.filecontainer')

let AddNewItem_Name = ''
let NabarsettingStatus  = false;
let filecontainerstatus = false


let BtnBall = document.querySelector('.BtnBall')
let FillShapeButton  = document.querySelector('.FillShapeButton')


let BtnBallNeon = document.querySelector('.BtnBallNeon')
let penNeonButton  = document.querySelector('.penNeonButton')


penNeonButton.addEventListener('click',()=>{
    BtnBallNeon.classList.toggle('active')

    checkpenmode(); 

})


navbar.addEventListener('click', (e) => {
    const clickedEl = e.target;

    // Find the closest parent ButtonContainer (or itself)
    const buttonContainer = clickedEl.closest('.ButtonContainer');

    let CurrentNavbarItemsSettings =  buttonContainer.querySelector('.NavbarItemsSettings');

    document.querySelectorAll('.NavbarItemsSettings').forEach((item)=>{
        
        if (item != CurrentNavbarItemsSettings) {
        
            item.style.display='none'
            
        }

        else{
        
            NabarsettingStatus ? (NabarsettingStatus=false ) : (item.style.display='flex' , NabarsettingStatus=true);


        }

        document.body.addEventListener('dblclick',()=>{
         if (!NabarsettingStatus) {
                
                item.style.display='none'
            
         }   
    })
        
    })


    
            
       
});




threeverticaldots.addEventListener('click',()=>{

  filecontainerstatus ?  (filecontainer.style.display='none',filecontainer=false):(filecontainer.style.display='flex',filecontainerstatus=true);
    

})




document.querySelectorAll('.NavbarItemsSettings').forEach((item)=>{

    item.addEventListener('click',(e)=>{
        
        let selectedItemInSetting  = e.target;        

        getselectedItemInSetting(selectedItemInSetting);


    })
    

})    