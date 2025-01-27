
let data = JSON.parse(localStorage.getItem('data')) || {};
let step = data.step || 0;
let username, email, mobile, subsciption = data.subsciption || '', m_price = 9, y_price = 90, check = false, addOnTotal = 0, total = 0;

let addondata = data.addon || [];

(() => {

    switch (step) {
        case 1:
            document.getElementById('form1').style.display = 'none';
            document.getElementById('form2').style.display = 'block';
            document.getElementsByClassName('stage')[1].classList.add('active');

            document.querySelectorAll('.card').forEach(e => {
                let str = e.childNodes[3].childNodes[1].innerText;
                if (str == data.subsciption) {
                    e.classList.add('activecard');
                }
            });


            document.getElementById('toggleer-input').checked = data.check;
            break;
        case 2:
            document.getElementById('form1').style.display = 'none';
            document.getElementById('form2').style.display = 'none';
            document.getElementById('form3').style.display = 'block';
            document.getElementsByClassName('stage')[2].classList.add('active');
            document.querySelectorAll('.checkbox-input').forEach(e => {

                if (data.addon.includes(parseInt(e.getAttribute('value')))) {
                    e.checked = true
                    e.parentNode.parentNode.style.backgroundColor = '#F8F9FE';
                    e.parentNode.parentNode.style.border = '1px solid hsl(243, 100%, 62%)';

                } else {

                    e.parentNode.parentNode.style.backgroundColor = '#FFFFFF';
                    e.parentNode.parentNode.style.border = '1px solid hsl(229, 24%, 87%)';

                }
            });
            break;
        case 3:
            document.getElementById('form1').style.display = 'none';
            document.getElementById('form2').style.display = 'none';
            document.getElementById('form3').style.display = 'none';
            document.getElementById('form4').style.display = 'block';
            document.getElementById('plan-show').innerText = data.subsciption;
            document.getElementById('month-show').innerText = data.check ? '(yearly)' : '(monthly)';
            document.getElementsByClassName('stage')[3].classList.add('active');
            let divv = document.getElementsByClassName('plan-check-extra-plans')[0];
            divv.innerHTML = '';

            document.querySelectorAll('.checkbox-input').forEach(e => {
                let y = e.getAttribute('value');
                if (data.addon.includes(parseInt(e.getAttribute('value')))) {

                    let div = document.createElement('div');
                    let p = document.createElement('p');
                    let h5 = document.createElement('span');
                    p.innerText = e.parentNode.parentNode.childNodes[3].childNodes[1].innerText;
                    h5.innerHTML = e.parentNode.parentNode.childNodes[5].childNodes[check ? 3 : 1].innerText;
                    div.appendChild(p);
                    div.appendChild(h5);
                    div.setAttribute('id', 'extra-plan-show');
                    divv.appendChild(div);
                }
            });
            document.getElementById('total-price').innerText = `+$ ${data.total_price} ${data.check ? '/yr' : '/mo'}`;

            break;
        default:
            document.getElementById('form1').style.display = 'block';
            document.getElementsByClassName('stage')[0].classList.add('active');
    }


    if (data.username) document.getElementById('name-input').value = data.username;
    if (data.email) document.getElementById('email-input').value = data.email;
    if (data.mobile) document.getElementById('mobile-input').value = data.mobile;

})();

document.getElementById('name-input').addEventListener('input', function (e) {
    

    const input = e.target.value;
    const isValid =  /^(?!.*\s{2,})[a-zA-Z\s]+$/.test(input); 

    if (isValid) {
        document.getElementById('name-input').style.border = '1px solid hsl(229, 24%, 87%)';
        document.getElementById('name-error').style.display = 'none';
        document.getElementById('next-btn0 ').disabled = false;
        document.getElementById('next-btn0 ').style.opacity = 1;
        
    } else {
        document.getElementById('name-input').style.border = '1px solid red';
        document.getElementById('name-error').style.display = 'block';
        document.getElementById('name-error').innerHTML = 'Only Letters and single space'
       document.getElementById('next-btn0 ').disabled = true;
       document.getElementById('next-btn0 ').style.opacity = 0.5;
        
    }
});

document.getElementById('email-input').addEventListener('input', function (e) {
    document.getElementById('email-input').style.border = '1px solid  hsl(229, 24%, 87%)';
    document.getElementById('email-error').style.display = 'none';
});

document.getElementById('mobile-input').addEventListener('input', function (e) {
    document.getElementById('mobile-input').style.border = '1px solid  hsl(229, 24%, 87%)';
    document.getElementById('mobile-error').style.display = 'none';
});




document.getElementById('form1').addEventListener('submit', function (e) {
    e.preventDefault();
    username = document.getElementsByTagName('input')[0];
    email = document.getElementsByTagName('input')[1];
    mobile = document.getElementsByTagName('input')[2];

    let anyFieldEmpty = [username, email, mobile].filter(e => e.value == '');

    if (anyFieldEmpty.length == 0) {
        document.getElementById('form1').style.display = 'none';
        document.getElementById('form2').style.display = 'block';
        username = document.getElementsByTagName('input')[0].value;
        email = document.getElementsByTagName('input')[1].value;
        mobile = document.getElementsByTagName('input')[2].value;
        data = {
            step: 1,
            username: username,
            email: email,
            mobile: mobile,
            addon : []
        }
        localStorage.setItem('data', JSON.stringify(data));
        document.getElementsByClassName('stage')[0].classList.remove('active');
        document.getElementsByClassName('stage')[1].classList.add('active');
    }
    else {
        anyFieldEmpty.forEach(e => {
            if (e.getAttribute('id') == 'name-input') {
                document.getElementById('name-error').style.display = 'block';
                e.style.border = '1px solid red'
            }
            else if (e.getAttribute('id') == 'email-input') {
                document.getElementById('email-error').style.display = 'block';
                e.style.border = '1px solid red'
            }
            else {
                document.getElementById('mobile-error').style.display = 'block';
                e.style.border = '1px solid red'
            }
        })
    }
});

// Subscription card event listener
let sub_div = 0;
document.querySelectorAll('.card').forEach(e => {
    e.addEventListener('click', cardEvent)
});

function cardEvent(e) {
    document.querySelectorAll('.card').forEach(evetnt => {
        evetnt.style.backgroundColor = '#FFFFFF';
        evetnt.style.border = '1px solid hsl(229, 24%, 87%)'
        evetnt.removeAttribute('selecteddiv');
    })

    sub_div = this;
    this.style.backgroundColor = '#F8F9FE';
    this.style.border = '1px solid hsl(243, 100%, 62%)';
    this.setAttribute('selecteddiv', 'true');
    subsciption = this.childNodes[3].childNodes[1].innerText;
  
    y_price = parseInt(this.childNodes[3].childNodes[5].getAttribute('value'));
    m_price = parseInt(this.childNodes[3].childNodes[3].getAttribute('value'));
    data.m_price = m_price;
    data.y_price = y_price;
    localStorage.setItem('data', JSON.stringify(data))
}

// Monthly and Yearly toggle event
document.getElementById('toggleer-input').addEventListener('change', function (e) {
    data = JSON.parse(localStorage.getItem('data'));
    if (e.target.checked) {
        document.getElementsByClassName('monthly')[0].style.color = 'hsl(231, 11%, 63%)';
        document.getElementsByClassName('yearly')[0].style.color = 'hsl(213, 96%, 18%)';
        document.querySelectorAll('#year-free').forEach(ev => {
            ev.style.display = 'block';
            check = true;
            data.check = true;
            localStorage.setItem('data', JSON.stringify(data));
        });

        document.querySelectorAll('#month-price1').forEach(ee => {
            ee.style.display = 'none';
        });

        document.querySelectorAll('#month-price').forEach(ee => {
            ee.style.display = 'block';
        });
    } else {
        document.getElementsByClassName('monthly')[0].style.color = 'hsl(213, 96%, 18%)';
        document.getElementsByClassName('yearly')[0].style.color = 'hsl(231, 11%, 63%)';
        document.querySelectorAll('#year-free').forEach(ev => {
            ev.style.display = 'none';
        });
        document.querySelectorAll('#month-price1').forEach(ee => {
            ee.style.display = 'block';
        });

        document.querySelectorAll('#month-price').forEach(ee => {
            ee.style.display = 'none';
        });
        check = false;
        data.check = false;
        localStorage.setItem('data', JSON.stringify(data));
    }

});

// Back button in Form 2

document.getElementById('back-btn1').addEventListener('click', function (e) {
    e.preventDefault();


    data = JSON.parse(localStorage.getItem('data'));


    data.step = 0;
    localStorage.setItem('data', JSON.stringify(data));


    document.getElementsByClassName('stage')[0].classList.add('active');
    document.getElementsByClassName('stage')[1].classList.remove('active');
    document.getElementById('form1').style.display = 'block';
    document.getElementById('form2').style.display = 'none';


    document.getElementsByTagName('input')[0].value = data.username;
    document.getElementsByTagName('input')[1].value = data.email;
    document.getElementsByTagName('input')[2].value = data.mobile;
});


// Form 2 submit event
document.getElementById('form2').addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementsByClassName('stage')[1].classList.remove('active');
    document.getElementsByClassName('stage')[2].classList.add('active');
    document.getElementById('form2').style.display = 'none';
    document.getElementById('form3').style.display = 'block';
    data = JSON.parse(localStorage.getItem('data'));
    if (check == true) {
        document.querySelectorAll('#add-on-plan-year').forEach(e => {
            e.style.display = 'block';
        });
        document.querySelectorAll('#add-on-plan').forEach(e => {
            e.style.display = 'none';
        });
    } else {
        document.querySelectorAll('#add-on-plan').forEach(e => {
            e.style.display = 'block';
        });
        document.querySelectorAll('#add-on-plan-year').forEach(e => {
            e.style.display = 'none';
        });
    }
    data.step = 2;
    localStorage.setItem('data', JSON.stringify(data));
});

// Back button in Form 2
document.getElementById('back-btn2').addEventListener('click', function (e) {
    e.preventDefault();


    data = JSON.parse(localStorage.getItem('data'));
    addondata = [];
    data.addon = [];
    data.step = 1;
    localStorage.setItem('data', JSON.stringify(data));

    document.querySelectorAll('.card-addon').forEach(e => {
        e.style.backgroundColor = ' #FFFFFF';
        e.style.border = '1px solid hsl(229, 24%, 87%)';

    });

    document.getElementsByClassName('stage')[1].classList.add('active');
    document.getElementsByClassName('stage')[2].classList.remove('active');
    document.getElementById('form2').style.display = 'block';
    document.getElementById('form3').style.display = 'none';



    addOnTotal = 0;

    document.querySelectorAll('.card').forEach(e => {
        let str = e.childNodes[3].childNodes[1].innerText;
        if (str == data.subsciption) {
            e.classList.add('activecard');
        }
    });


    document.getElementById('toggleer-input').checked = data.check;

    document.getElementById('form3').reset();

});

// Add-on plan checkbox event
document.querySelectorAll('.checkbox-input').forEach(e => {

    e.addEventListener('change', function (event) {
        if (event.target.checked) {
            this.parentNode.parentNode.style.backgroundColor = '#F8F9FE';
            this.parentNode.parentNode.style.border = '1px solid hsl(243, 100%, 62%)';
          
            addondata.push(parseInt(e.getAttribute('value')));

            if (check) {
                addOnTotal += parseInt(this.parentNode.parentNode.childNodes[5].childNodes[3].getAttribute('value'));
            } else {
                addOnTotal += parseInt(this.parentNode.parentNode.childNodes[5].childNodes[1].getAttribute('value'));
            }
        } else {
            addondata = addondata.filter(i => parseInt(e.getAttribute('value')) != i)
            this.parentNode.parentNode.style.backgroundColor = '#FFFFFF';
            this.parentNode.parentNode.style.border = '1px solid hsl(229, 24%, 87%)';
            if (check) {
                addOnTotal -= parseInt(this.parentNode.parentNode.childNodes[5].childNodes[3].getAttribute('value'));
            } else {
                addOnTotal -= parseInt(this.parentNode.parentNode.childNodes[5].childNodes[1].getAttribute('value'));
            }
        }
        data = JSON.parse(localStorage.getItem('data'));
        data.addon = addondata;
        data = localStorage.setItem('data', JSON.stringify(data));
    });
});

// Final Form submit
document.getElementById('form3').addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('form3').style.display = 'none';
    document.getElementById('form4').style.display = 'block';
    document.getElementsByClassName('stage')[2].classList.remove('active');
    document.getElementsByClassName('stage')[3].classList.add('active');
    document.getElementById('plan-show').innerText = subsciption;
    document.getElementById('month-show').innerText = check ? '(yearly)' : '(monthly)';

    document.getElementById('show-mon-yea-plan').innerText = `+$${check ? y_price : m_price}  ${check ? "/yr" : "/mo"}`;
    document.getElementById('mon-year-total').innerHTML = `${check ? '(Yearly)' : '(Monthly)'}`;
    document.getElementById('total-price').innerText = `+$${(check ? y_price : m_price) + addOnTotal}/${check ? 'yr' : 'mo'}`;
    let divv = document.getElementsByClassName('plan-check-extra-plans')[0];
    divv.innerHTML = '';
    data = JSON.parse(localStorage.getItem('data'));
    data.step = 3;
    localStorage.setItem('data', JSON.stringify(data));

    document.querySelectorAll('.checkbox-input').forEach(e => {
        if (e.checked) {
            let div = document.createElement('div');
            let p = document.createElement('p');
            let h5 = document.createElement('span');
            p.innerText = e.parentNode.parentNode.childNodes[3].childNodes[1].innerText;
            h5.innerHTML = e.parentNode.parentNode.childNodes[5].childNodes[check ? 3 : 1].innerText;
            div.appendChild(p);
            div.appendChild(h5);
            div.setAttribute('id', 'extra-plan-show');
            divv.appendChild(div);
        }
    });
    data.total_price = (check ? y_price : m_price) + addOnTotal;
    localStorage.setItem('data', JSON.stringify(data));
});

// change plan 

document.getElementById('Change-plan').addEventListener('click', function () {

    document.getElementById('form3').style.display = 'none';
    document.getElementById('form4').style.display = 'none';
    document.getElementById('form1').style.display = 'none';
    document.getElementById('form2').style.display = 'block';
    document.getElementsByClassName('stage')[1].classList.add('active');
    addondata = [];
    data.addon = [];
    data.total_price = 0;
    addOnTotal = 0;
    document.getElementById('form3').reset();
    localStorage.setItem('data',JSON.stringify(data));
})

// Back button in Form 4
document.getElementById('back-btn3').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementsByClassName('stage')[3].classList.remove('active');
    document.getElementsByClassName('stage')[2].classList.add('active');
    document.getElementById('form4').style.display = 'none';
    document.getElementById('form3').style.display = 'block';

    data = JSON.parse(localStorage.getItem('data'));
    data.step = 2;
    localStorage.setItem('data', JSON.stringify(data));
});

// Form 4 final submit - Thank you message
document.getElementById('form4').addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementsByClassName('thankyou')[0].style.display = 'flex';
    document.getElementById('form4').style.display = 'none';

    setTimeout(() => {
        localStorage.removeItem('data');
        // window.location.reload();
        const obj = {
            "step": 0,
            "username": "",
            "email": "",
            "mobile": "",
        }
        localStorage.setItem('data',JSON.stringify(obj));

        document.getElementById('form1').style.display = 'block';

        document.getElementById('form2').style.display = 'none';
        document.getElementById('form3').style.display = 'none';
        document.getElementById('form4').style.display = 'none';

       document.getElementsByClassName('stage')[0].classList.add('active');
       document.getElementsByClassName('stage')[3].classList.remove('active');

        document.getElementById('name-input').value ='';
        document.getElementById('email-input').value = '';
        document.getElementById('mobile-input').value = '';

       
    }, 2000);
});







