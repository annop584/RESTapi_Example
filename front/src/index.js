const frontaddress = "http://localhost:9000/";
const backaddress = "http://localhost:3000/";
const fieldColName = ['id','name','age'];
let table = document.getElementById("bmitable").getElementsByTagName("tbody")[0];

const clearTable = () =>{
  while(table.firstChild) {
      // table.removeChild(table.firstChild);
      table.firstChild.remove();
  }
}

const fetchMembers =() =>{
  fetch(backaddress+"members", {
    method: 'get',
    headers: {'Content-Type': 'application/json'},
    })
    .then(response => response.json())
    .then(members => {
        members.forEach((key,index) =>{
          console.log(`${key.name} $ ${index}`);
          let row = document.createElement("tr");
          row.addEventListener("click", getMember);
          row.setAttribute("data-memberID", key.id);
          for (let i = 0; i < fieldColName.length; i++) {
            let cell = document.createElement("td");
            let cellText = document.createTextNode(`${key[fieldColName[i]]}`);
            console.log(`${key[fieldColName[i]]}`);
            cell.appendChild(cellText);
            row.appendChild(cell);
          }
          table.appendChild(row);
        }
      );
    })
    .then(()=>{

    })

}

document.addEventListener("DOMContentLoaded",()=>{
    fetchMembers();
});

//click insertBtn
document.getElementById("buttonSend").addEventListener("click", ()=>{
  let inputName = document.getElementById('inputName').value;
  let inputSurname = document.getElementById('inputSurname').value;
  let inputNickname = document.getElementById('inputNickname').value;
  let inputAge = document.getElementById('inputAge').value;
  let inputJob = document.getElementById('inputJob').value;
  let inputFavoritegame = document.getElementById('inputFavoritegame').value;
  let inputHobby = document.getElementById('inputHobby').value;
  fetch(backaddress+"member", {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: inputName,
      surname: inputSurname,
      nickname: inputNickname,
      age: inputAge,
      job: inputJob,
      favoritegame: inputFavoritegame,
      hobby: inputHobby,
    })
  })
    .then(response => response.json())
    .then(user => {
        alert("insertDone!!")
        clearTable();
        fetchMembers();
    })
});


const getMember =(event)=>{
    let memberID = event.currentTarget.dataset.memberid;
    window.location = `${frontaddress}pages/member.html?memberID=${memberID}`;
}
