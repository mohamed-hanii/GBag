$(document).ready(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) { 
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });
});
document.querySelectorAll('.custom-card').forEach(card => {
    const mainImg = card.querySelector('.img-main');
    const hoverImg = card.querySelector('.img-hover');

    card.addEventListener('mouseenter', () => {
      mainImg.classList.add('d-none');
      hoverImg.classList.remove('d-none');
    });

    card.addEventListener('mouseleave', () => {
      mainImg.classList.remove('d-none');
      hoverImg.classList.add('d-none');
    });
  });