function editForm(user){
    $('#edit_profile_modal').empty()
    var json = JSON.parse(user.replace(/\\/g, "/"))
    var html = `
    <form class="w3-modal-content w3-animate-top w3-round-large" action="/perfil/${json._id}/editar/" method="POST">
      
      <div class="w3-container w3-round-large">
        <h2 style="margin: 10px 20px 20px 20px;">Editar Perfil</h2>

  
        <div class="w3-container">
          <div class="w3-col s3">
            <label class="w3-text-teal"><b>Nome: </b></label>
          </div>
          <div class="w3-col s9 w3-border">
            <input class="w3-input w3-border w3-light-grey" type="text" name="nome" value="${json.username}" required>
          </div>
        </div>
  
        <div class="w3-container">
          <div class="w3-col s3">
            <label class="w3-text-teal"><b>Descrição: </b></label>
          </div>
          <div class="w3-col s9 w3-border">
            <input class="w3-input w3-border w3-light-grey" type="text" name="descricao" value="${json.descricao? json.descricao : ''}" placeHolder=${json.descricao? '' : "Adicione uma descrição."}">
          </div>
        </div>
        <div class="w3-container">
          <div class="w3-col s3 w3-margin-top">
            <label class="w3-text-teal"><b>Estatuto: </b></label>
          </div>
          <div class="w3-col s9 w3-margin-top">
            <select name="estatuto" id="estatuto" style="width:100%" required>
              <option value="estudante" ` + (json.estatuto == "estudante" ? `selected` : ``)  + `>Estudante</option>
              <option value="docente" ` + (json.estatuto == "docente" ? `selected` : ``) + `>Docente</option>
              <option value="trabalhador" ` + (json.estatuto == "trabalhador" ? `selected` : ``) + `>Trabalhador</option>
            </select>
          </div>
        </div>
        <div class="w3-container">
        <div class="w3-col s3 w3-margin-top">
          <label class="w3-text-teal"><b>Filiação: </b></label>
        </div>
        <div class="w3-col s9 ">
            <input class="w3-input w3-margin-top w3-light-grey w3-margin-top w3-border" type="text" name="filiacao" value="${json.filiacao}" required>
        </div>
      </div>
        <div class="w3-row w3-container w3-margin-bottom">
          <input class="w3-btn w3-blue-grey w3-margin-top" style="float:right" type="submit" value="Submeter"/>
          <input class="w3-btn w3-blue-grey w3-margin-top" id="close_edit_profile" style="float:right; margin: 10px" type="button" value="Cancelar"/>
        </div>
      </div>
    </form>`
    
    $('#edit_profile_modal').append(html)
    document.getElementById('edit_profile_modal').style.display = 'block';

    $("#close_edit_profile").click(function(event) {
        event.preventDefault();
        document.getElementById('edit_profile_modal').style.display='none';   
    })
    
}

// Fazer este método. DELETE /users/62a901115fd8b9f700f63974
function deleteUser(id){
    $.ajax({
      url: '/users/'+id,
      type: 'DELETE',
      success: function(result) {window.location.replace("/home");}
    });
}