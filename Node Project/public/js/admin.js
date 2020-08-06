const deleteProduct = (btn) => {
    const prodId = btn.parentNode.querySelector('[name=productId]').value
    // console.log(prodId)
    const csrf = btn.parentNode.querySelector('[name=_csrf]').value
    // console.log(csrf)
    const productElement = btn.closest('article');

    fetch('/admin/product/' + prodId, {
        method: 'DELETE',
        headers: {
            'csrf-token': csrf
        }
    }).then(result => {
        // console.log(result)
        return result.json();
    }).then(data => {
        productElement.parentNode.remove();
    })
        .catch(err => {
            console.log(err)
        })
}