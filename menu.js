$(document).ready(function () {
    if (localStorage.getItem("cart") == null) {
        var cart = {};
    } else {
        cart = JSON.parse(localStorage.getItem("cart"));
    }
    updatecart(cart);
    $(".sidebar").hide();

    $(".add").on("click",".cart",function () {
        var ids = $(this).attr("id");
        if (cart[ids] != undefined) {
            cart[ids] += 1;
        } else {
            cart[ids] = 1;
        }
        updatecart(cart);  
    });

    $(".cartsidebar").click(function () {
        $(".sidebar").show(500);
        $(this).hide();
    });

    $(".close").click(function () {
        $(".sidebar").hide(500);
        $(".cartsidebar").show();
    });

    $(".add").on("click","button.minus",function(){
        let a=this.id.slice(5,8);
        cart[a]-=1;
        cart[a]=Math.max(0,cart[a]);
        console.log(cart);
        document.getElementById("val"+a).innerHTML=cart[a];
        updatecart(cart);
    });

    // $(".row").on("click","button.minus",function(){
    //     let a=this.id.slice(5,8);
    //     cart[a]-=1;
    //     cart[a]=Math.max(0,cart[a]);
    //     console.log(cart);
    //     document.getElementById("val"+a).innerHTML=cart[a];
    //     updatecart(cart);
    // });

    $(".add").on("click","button.plus",function(){
        let a=this.id.slice(4,8);
        cart[a]+=1;
        // console.log(cart);
        document.getElementById("val"+a).innerHTML=cart[a];
        updatecart(cart);
        
    });

    // $(".row").on("click","button.plus",function(){
    //     let a=this.id.slice(4,8);
    //     cart[a]+=1;
    //     console.log(cart);
    //     document.getElementById("val"+a).innerHTML=cart[a];
    //     updatecart(cart);
        
    // });

    $("#clear").click(function(){
        clearcart(cart);
    });

    $(".remove").click(function(){
        remove(this,cart);
    });
});

function updatecart(cart){
    for(var item in cart){
        document.getElementById("r"+item).innerHTML="<button id='minus"+item+"' class='btn minus'>-</button><div id='val"+item+"' style='text-align:center;'>"+cart[item]+"</div><button id='plus"+item+"' class='btn plus'>+</button>";
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    addtocart(cart);
    // console.log(cart);
};


function addtocart(cart){
    // console.log(1);
    let str=``
    for(let item in cart){
        str+=`<div class="row">
        <div class="col-md-6">
            <div class="row cartname"><strong>`+$("#item"+item).text()+`</strong></div>
            <div class="row cartq w-100">Quantity: `+cart[item]+`</div>
        </div>
        <div class="col-md-6">
            <div class="row cartprice"><strong>`+$("#price"+item).text()+`</strong></div>
            <div class="row rem"><button class="remove" id="remove`+item+`">remove</button></div>
        </div>
    </div>`;
    }
    
    document.getElementById("cartcontainer").innerHTML=str;
}
function clearcart(cart){
    for( let item in cart){
        document.getElementById("r"+item).innerHTML=`<button id="`+item+`" class="btn cart" type="button">Add</button>`;
    }
    localStorage.clear();
    for(let i in cart){
        delete cart[i];
    }
    updatecart(cart);

}

function remove(e,cart){
    let b = this.id.slice(6,);
    delete cart[b];
    console.log(cart);
    document.getElementById("r"+b).innerHTML=`<button id="`+b+`" class="btn cart" type="button">Add</button>`;
    
    addtocart(cart);
    updatecart(cart);
    // console.log(b);
}