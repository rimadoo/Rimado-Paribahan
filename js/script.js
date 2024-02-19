// console.log('Hello World');
let count = 0;
let totalPrCount = 0;

const seats = document.getElementsByClassName('seat');
for (const seat of seats) {
  let arr = [];
  //   console.log(seat);
  seat.addEventListener('click', function (e) {
    // console.log(e.target);
    const seat = e.target.innerText;
    const seatLists = document.getElementById('seatReasive');
    const countSeat = document.getElementById('countSeat');
    const availableSeat = document.getElementById('seatsNum');
    const seatNum = availableSeat.innerText;
    const btnNext = document.getElementById('btnNext');
    const totalPrice = document.getElementById('totalPrice');
    const grandTotalPrice = document.getElementById('grandTotalPrice');
    const inpNum = document.getElementById('number');
    const inpEmail = document.getElementById('inpEmail');
    const inpName = document.getElementById('inpName');
    const setListCreate = document.createElement('div');
    setListCreate.innerHTML = ` <div
    class="flex justify-between text-base font-normal text-[#03071299]"
  >
    <p class="seatList">${seat}</p>
    <p>Economoy</p>
    <p>550</p>
  </div>`;

    const arrInc = arr.includes(seat);
    console.log(arrInc);
    if (count < 4) {
      e.target.style.backgroundColor = '#1DD100';
      e.target.style.color = '#fff';
      if (!arrInc) {
        seatLists.appendChild(setListCreate);
        totalPrCount += 550;
        count += 1;
        const availableS = parseInt(seatNum) - 1;
        availableSeat.innerText = availableS;
        inpName.disabled = false;
        inpEmail.disabled = false;
        inpNum.disabled = false;
      } else {
        alert('Sorry, you have already booked this seat.');
      }
    } else {
      alert(
        'You cannot select more than four seats at a time. You have already selected four seats.'
      );
      removeEventListener(seat);
    }
    countSeat.innerText = count;
    totalPrice.innerText = totalPrCount;
    grandTotalPrice.innerText = totalPrCount;
    inpNum.addEventListener('keyup', function (e) {
      const numValue = parseInt(e.target.value);
      if (numValue >= 0) {
        btnNext.innerHTML = `<a href="#successMassage"><input
        id="btnNextMain"
        type="button"
        value="Next"
        class="bg-primary text-white border-2 border-solid border-primary hover:bg-[#fff0] hover:text-primary py-2 sm:py-3 w-full rounded-2xl text-xl font-extrabold cursor-pointer"
      /></a>`;
        const btn = document.getElementById('btnNextMain');
        btn.addEventListener('click', function () {
          const cong = document.getElementById('successMassage');
          document.getElementById('mainPart').style.cssText = 'opacity: 0.25;';
          cong.classList.remove('hidden');

          const btnSec = document.getElementById('btnSuccess');
          btnSec.addEventListener('click', function () {
            window.location.reload();
            cong.classList.add('hidden');
          });
        });
      } else if (isNaN(numValue)) {
        btnNext.innerHTML = `<input
        type="button"
        value="Next"
        class="bg-[#686868] text-[#c4c3c3] border-2 border-solid border-[#fff0] py-2 sm:py-3 w-full rounded-2xl text-xl font-extrabold"
      />`;
      }
      console.log(numValue);
    });

    const seatList = document.getElementsByClassName('seatList');
    for (const set of seatList) {
      // console.log(set.innerText);
      arr.push(set.innerText);
    }
    // console.log(arr);
    coupon();
  });
}

function coupon() {
  const seatList = document.getElementsByClassName('seatList');
  let arr = [];
  for (const set of seatList) {
    // console.log(set.innerText);
    const setVlu = set.innerText;
    arr.push(setVlu);
  }
  // console.log(arr);
  if (arr.length === 4) {
    const inp = document.getElementById('couponInp');
    inp.disabled = false;
    inp.classList.add('bg-white');
    inp.parentNode.classList.add('bg-white');

    const btn = document.getElementById('btnCoupon');
    btn.parentNode.innerHTML = `<button
    id="btnCouponAct"
    class="bg-primary text-white h-full px-4 rounded-lg text-base font-semibold border-2 border-solid border-primary hover:bg-[#fff0] hover:text-primary cursor-pointer">
    Apply
  </button>`;

    const btnAct = document.getElementById('btnCouponAct');
    btnAct.addEventListener('click', function () {
      if (typeof discount() === 'number') {
        btnAct.innerText = 'Applied';
        () => {
          btnCouponAc.parentNode.parentNode.classList.add('hidden');
        };
        const disc = discount();
        btnAct.parentNode.parentNode.removeAttribute('class');
        btnAct.parentNode.parentNode.innerHTML = `<div
      class="py-4 text-base font-medium inter flex justify-between mt-2"
    >
      <p>Discount</p>
      <p>BDT <span id="disc">${discount()}</span></p>
    </div>`;
        document.getElementById('grandTotalPrice').innerText =
          totalPrCount - disc;
        console.log(disc);
      }
    });
  }
}

function discount() {
  const inpValue = document.getElementById('couponInp').value;
  if (inpValue === 'NEW15') {
    const desc15 = (totalPrCount * 15) / 100;
    return desc15;
  } else if (inpValue === 'Couple 20') {
    const desc20 = (totalPrCount * 20) / 100;
    return desc20;
  } else if (inpValue === '') {
    alert('Please Input a coupon code.');
  } else {
    alert('Please Input a valid coupon code.');
  }
}
