import './../css/index.css';

import PurchaseModel from './Model/PurchaseModel';
import LotteryResultView from './View/LotteryResultView';
import { $purchaseForm, $purchaseInput, $purchaseResult } from './dom';

class App {
 constructor(Model, views) {
  this.purchase = new Model();
  views.forEach(({ view, target }) => {
   new view(target, this.purchase);
  });
  this.setEvent();
 }

 setEvent() {
  $purchaseForm.addEventListener(
   'submit',
   this.handlePurchaseFormSubmit.bind(this)
  );

  $purchaseInput.addEventListener('change', (event) => {
   if (event.target.value > 100000) {
    event.target.value = 100000;
   }
  });
 }

 handlePurchaseFormSubmit(event) {
  event.preventDefault();
  const target = event.currentTarget;
  if (!target) return;
  try {
   this.purchase.buy(+target.purchase.value);
  } catch (e) {
   alert(e.message);
  }
 }
}
new App(PurchaseModel, [{ view: LotteryResultView, target: $purchaseResult }]);

// // TODO : modal logic 분리
// const onModalShow = () => {
//  $modal.classList.add('open');
// };

// const onModalClose = () => {
//  $modal.classList.remove('open');
// };

// $showResultButton.addEventListener('click', onModalShow);
// $modalClose.addEventListener('click', onModalClose);
