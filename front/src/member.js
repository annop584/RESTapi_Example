const frontaddress = "http://localhost:9000/";
const backaddress = "http://localhost:3000/";

const getMemberIDFromQueryString = () =>{
  let urlParams = new URLSearchParams(location.search);
  let member_id = urlParams.get('memberID');
  return member_id;
}

const fetchMember = (member_id) =>{
  fetch(backaddress+"member/"+member_id, {
    method: 'get',
    headers: {'Content-Type': 'application/json'},
    })
    .then(response => response.json())
    .then(member => {
          console.log(member);
          //hide updateButton and showButton
          disableMemberForm(true);
          let isEdit= document.getElementById("toggleShowOrEdit");
          let updateBtn= document.getElementById("buttonUpdate");
          let deleteBtn= document.getElementById("buttonDelete");
          isEdit.setAttribute('data-isEdit', 'edit');
          isEdit.innerText="Edit";
          updateBtn.hidden = true;
          deleteBtn.hidden = true;

          //get value from backend then update to form
          document.getElementById('inputName').value = member.name;
          document.getElementById('inputSurname').value = member.surname;
          document.getElementById('inputNickname').value = member.nickname;
          document.getElementById('inputAge').value = member.age;
          document.getElementById('inputJob').value = member.job;
          document.getElementById('inputFavoritegame').value = member.favoritegame;
          document.getElementById('inputHobby').value = member.hobby;
    })
}

const disableMemberForm = (isDisable) =>{
  let memberForm = document.getElementsByClassName("member-form");
  for (var i = 0; i < memberForm.length; i++) {
    memberForm[i].disabled=isDisable;
  }
}

//WhenLoadePage
document.addEventListener("DOMContentLoaded",function(){
    let memberID = getMemberIDFromQueryString();
    fetchMember(memberID);
});

//toggleEdit&Show
document.getElementById("toggleShowOrEdit").addEventListener("click",()=>{
      let isEdit= document.getElementById("toggleShowOrEdit");
      let updateBtn= document.getElementById("buttonUpdate");
      let deleteBtn= document.getElementById("buttonDelete");
      if(isEdit.dataset.isedit=="edit"){
          isEdit.setAttribute('data-isEdit', 'show');
          isEdit.innerText="Show only";
          disableMemberForm(false);
          updateBtn.hidden = false;
          deleteBtn.hidden = false;
      }else{
          isEdit.setAttribute('data-isEdit', 'edit');
          isEdit.innerText="Edit";
          disableMemberForm(true);
          updateBtn.hidden = true;
          deleteBtn.hidden = true;
      }
});

//getBacktoIndex
document.getElementById("titleMember").addEventListener("click",()=>{
    window.location = `${frontaddress}`;
});

//updateMember
document.getElementById("buttonUpdate").addEventListener("click",()=>{
    let member_id = getMemberIDFromQueryString();
    let inputName = document.getElementById('inputName').value;
    let inputSurname = document.getElementById('inputSurname').value;
    let inputNickname = document.getElementById('inputNickname').value;
    let inputAge = document.getElementById('inputAge').value;
    let inputJob = document.getElementById('inputJob').value;
    let inputFavoritegame = document.getElementById('inputFavoritegame').value;
    let inputHobby = document.getElementById('inputHobby').value;
    fetch(backaddress+"member/"+member_id, {
      method: 'put',
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
      .then(member => {
          alert("updateDone!!")
          let member_id = getMemberIDFromQueryString();
          fetchMember(member_id);
      })
});

//DeleteMember
document.getElementById("buttonDelete").addEventListener("click",()=>{
    let member_id = getMemberIDFromQueryString();
    fetch(backaddress+"member/"+member_id, {
      method: 'delete',
      headers: {'Content-Type': 'application/json'}
    })
      .then(response => response.json())
      .then(member => {
          alert("Deleted!! "+member.name)
          window.location = `${frontaddress}`;
      })
});
