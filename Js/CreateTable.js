const form = document.querySelector('#tableForm');

const getTableInfo = document.querySelector('.getTableInfo');

const table = document.querySelector('table');
const tableicon = document.querySelector('.tableicon');

let showTableBool = false

tableicon.addEventListener('click',()=>{

   if(!showTableBool){
       getTableInfo.style.display='flex'
       showTableBool = true;
   }
   
   else{
       showTableBool = false;
       getTableInfo.style.display='none'
       
   }
    
})






form.addEventListener('submit', function(e) {
    e.preventDefault(); // stop page refresh

    const formData = new FormData(form); // create FormData object
    const rows = parseInt(formData.get('rw')); // ✅ get 'rw' field
    const cols = parseInt(formData.get('cl')); // ✅ get 'cl' field

    let finalTableFormat = '';

    for (let i = 0; i < rows; i++) {
        finalTableFormat += '<tr>'; // start a row

        for (let j = 0; j < cols; j++) {
            finalTableFormat += '<td contenteditable="false">`${i,j}`</td>';
        }

        finalTableFormat += '</tr>'; // end the row
    }

    table.innerHTML = finalTableFormat;
});
