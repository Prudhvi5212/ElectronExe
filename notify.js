//jshint esversion:6

function doNotify(){
let myNotification = new Notification('Title', {
  body: 'Lorem Ipsum Dolor Sit Amet'
});

myNotification.onclick = () => {
  console.log('Notification clicked');
};
}
