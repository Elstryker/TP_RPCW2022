$(document).ready(function() {

    $('#add-one-file').click(function(event) {
        event.preventDefault()

        $('#add-one-file').before("<label for='file-title'>Titulo</label> <input type='text' name='title' class='file-title' placeholder='Título'> <br>   <label for='file-author'>Autor</label> <input type='text' name='author' class='file-author' placeholder='Autor'> <br>   <label for='form-file'>Ficheiro</label> <input type='file' name='file' class='file'> <br>")
    })

    $('#submit-file').click(function(event) {
        event.preventDefault();

        var fd = new FormData();
        var title = $('.file-title');
        var author = $('.file-author')
        var files = $('.file');

        arrTitles = []
        arrAuthors = []
        arrFiles = []

        for(let i = 0; i < files.length; i++) {
            arrTitles.push(title[i].value)
            arrAuthors.push(author[i].value)
        }

        console.log(arrTitles)
        console.log(files[0].files[0].name)

        fd.append('authors', arrAuthors)
        fd.append('titles', arrTitles)

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