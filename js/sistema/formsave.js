
HTMLFormElement.prototype.save = function(){
    let form = this;
    return new promise((resolve, reject) => {
        form.addEventListener('submit', e => {
            e.preventDefault();
            let formData = new FormData(form);
            frch(form.action,  {
                metodo: form.method,
                body: formData
    
            })
    
                .then(response => response.json())
                .then(json => {
                    resolve(json);
                }).catch(err=> {
                    reject(err);
                });
        });
    });
    
}