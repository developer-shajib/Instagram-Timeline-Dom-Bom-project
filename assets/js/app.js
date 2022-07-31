//get data
const post_modal = document.getElementById('timeline-modal');
const msg = document.querySelector('.msg');
const all_post =document.getElementById('all-post');
const edit_form = document.getElementById('edit_form');
//get all post
const getAllPosts =()=>{
    //get al LS Data
    let posts = readLSData('insta_post');
    //init value
    let list = '';
    //Check LS Data exist
    if(!posts){
        all_post.innerHTML= `<div class="text-center shadow-sm no-product">NO Post Found</div>`;
        return false;
    } ;
    //loop for Data
    posts.reverse().map((item,index)=>{
        list +=`
        <div class="card timeline-area shadow-sm rounded-5">
        <div class="card-body timeline-details d-flex align-items-center justify-content-between">
            <div class="left-area d-flex align-items-center">
                <a href="#"><img src="${item.aphoto}" alt="" /></a>
                <p>${item.aname}</p>
            </div>
            <div class="right-area">
                <div class="dropdown">
                    <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown">
                        <i class="fas fa-ellipsis-h"></i>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item product_edit" post_id="${item.id}" data href="#insta_edit_modal" data-bs-toggle="modal">Edit</a></li>
                        <li><a class="dropdown-item product_delete" post_id="${item.id}" href="#">Delete</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="post-content">
            ${item.pphoto ? '<img class="w-100" src="'+ item.pphoto +'" alt="" />' : ''}
            <p class="px-3 mb-0 mt-2" style="font-weight:bold;">${item.aname}</p>
            <p class="mx-3">${item.pcontent}</p>
        </div>
    </div>`;
    });
    //show data on post
    all_post.innerHTML= list;
 };
getAllPosts();
//submit product form
post_modal.onsubmit=(e)=>{
    e.preventDefault();
    //get data to form
    const form_data = new FormData(e.target);
    const data = Object.fromEntries(form_data.entries());
    const {aname,aphoto,pcontent,pphoto} = Object.fromEntries(form_data.entries());

    // random id
    let randId = Math.floor(Math.random() * 10000) + '_' + Date.now();
    //form validation
    if(!aname || !aphoto){
        msg.innerHTML= setAlert('All field are required')
    }
    else{
        createLSData('insta_post',{...data, id: randId});
        e.target.reset();
        getAllPosts();
    };
};
all_post.onclick=(e)=>{
    e.preventDefault();
    //product edit
    if(e.target.classList.contains('product_edit')){
        //get index
        let post_id= e.target.getAttribute('post_id');

        //get LS Data
        let data = readLSData('insta_post');

        let {aname,aphoto,id,pcontent,pphoto} = data.find(item => item.id == post_id);
    

        edit_form.innerHTML=`<div class="my-3">
        <label for="">Auth Name</label>
        <input name="aname" class="form-control" type="text" value="${aname}">
    </div>
    <div class="my-3">
        <label for="">Auth Photo</label>
        <input name="aphoto" class="form-control" type="text" value="${aphoto}">
    </div>
    <div class="my-3">
        <label for="">Post Content</label>
        <input name="pcontent" class="form-control" type="text" value="${pcontent}">
    </div>
    <div class="my-3">
        <input name="id" class="form-control" type="text" value="${id}">
    </div>
    <div class="my-3">
        <label for="">Post Photo</label>
        <input name="pphoto" class="form-control" type="text" value="${pphoto}">
    </div>
    <div class="my-3">
        <label for="">Post Photo</label>
        <img class="w-100" src="${pphoto}">
    </div>
    <div class="my-3">
        <input class="btn btn-primary w-100" type="submit" value="Update Now">`
    }

   // delete product 
    if(e.target.classList.contains('product_delete')){
        // confirm to delete product
        let confi = confirm('Do you delete it?');
        if(confi==true){
            let post_id= e.target.getAttribute('post_id');
            let data = readLSData('insta_post');

            let single_data = data.filter(item=>item.id !== post_id);
               
                //update LS Data
                 updateLSData('insta_post',single_data);
                // //now reload
                getAllPosts();
        }
    }

}


//edit form
edit_form.onsubmit=(e)=>{
    e.preventDefault();

    //get data to edit form
    let formData = new FormData(e.target);
    let {aname,aphoto,id,pcontent,pphoto} = Object.fromEntries(formData.entries());
    
//     //get dat to LS
    let all_data = readLSData('insta_post');

    let edit_data = all_data.findIndex(data => data.id == id);

    all_data[edit_data] = {aname,aphoto,id,pcontent,pphoto};

    //update LS Data
     updateLSData('insta_post',all_data);
    // //now realod data
    getAllPosts();
}