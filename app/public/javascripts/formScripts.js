$(document).ready(function() {

    $('#add-one-file').click(function(event) {
        event.preventDefault()

        $('#add-one-file').before("<label for='form-title'>Titulo</label> <input type='text' name='title' class='file-title' placeholder='Título'> <br>   <label for='form-author'>Autor</label> <input type='text' name='author' class='file-author' placeholder='Autor'> <br> <label for='form-creationDate'>Data de Criação</label> <input type='date' name='creationDate' class='file-creationDate'> <br>   <label for='form-file'>Ficheiro</label> <input type='file' name='file' class='file'> <br>")
    })

    $('#submit-file').click(function(event) {
        event.preventDefault();

        var fd = new FormData();
        var title = $('.file-title');
        var author = $('.file-author')
        var creationDate = $('.file-creationDate')
        var files = $('.file');

        for(var tit of title) {
            if(tit.value.length == 0) {
                alert("Please fill all fields")
                return
            }
        }

        for(var aut of author) {
            if(aut.value.length == 0) {
                alert("Please fill all fields")
                return
            }
        }

        for(var file of files) {
            if(file.files.length == 0) {
                alert("Please fill all fields")
                return
            }
        }

        for(var date of creationDate) {
            if(date.value.length == 0) {
                alert("Please fill all fields")
                return
            }
        }
        
        arrTitles = []
        arrAuthors = []
        arrFiles = []
        arrCreationDates = []

        for(let i = 0; i < files.length; i++) {
            arrTitles.push(title[i].value)
            arrAuthors.push(author[i].value)
            arrCreationDates.push(creationDate[i].value)
        }

        console.log(arrTitles)
        console.log(arrCreationDates)
        console.log(files[0].files[0].name)

        fd.append('authors', arrAuthors)
        fd.append('titles', arrTitles)
        fd.append('creationDates', arrCreationDates)

        compressAndSendZip(files,fd)

        console.log("Compressing...")

    })
})

async function compressAndSendZip(files,fd) {
    zip = await compressFiles(files)

    console.log(zip)

    zip.generateAsync({type:'blob'})
            .then(function(data) {

                fd.append('file',data)

                console.log(fd.get('file'))

                $.ajax({
                    url: 'http://localhost:20000/create/file/',
                    type: 'POST',
                    data: fd,
                    contentType: false,
                    processData: false,
                    success: function() {
                        alert('File created successfully')
                    },
                    error: function() {
                        alert('Error creating file')
                    }
                })

            })
            .catch(function (err) {
                console.log(err)
            })
}