let quizCategoryCard = document.querySelector('.category-card');

quizz.forEach((categoryCard) => {

    quizCategoryCard.innerHTML += `<div class="col-12 col-md-6 col-xl-4 px-3">
                                    <div class="card shadow-lg rounded-4 border" style="height: 300px ; background-image:linear-gradient(to top, rgba(10, 20, 30, 0.95) 0%, rgba(10, 20, 30, 0.7) 50%, rgba(0,0,0,0) 100%),url('${categoryCard.image}');">
                                        <div class="card-body text-light py-3 d-flex flex-column justify-content-end">
                                            <h6 class="card-subtitle mb-2 text-secondary pb-2">${categoryCard.category}</h6>
                                            <h5 class="card-title pb-1">${categoryCard.title}</h5>
                                            <div class="col-7 ">
                                                <p class="card-text text-secondary">${categoryCard.description}</p>
                                            </div>
                                            <div
                                                class="card-bottom d-flex justify-content-between align-items-center pt-3">
                                                <p>10 Questions</p>
                                                <a href="./quizz.html?id=${categoryCard.id}" class="text-decoration-none">
                                                    <div
                                                        class="circle rounded-circle d-flex justify-content-center align-items-center border border-light ">
                                                        <span><i class="ri-arrow-right-line text-light fs-4"></i></span>
                                                    </div>
                                                </a>

                                            </div>
                                        </div>
                                    </div>
                                </div>`
})


window.addEventListener("scroll", () => {

    if (window.scrollY > 700) {
        document.querySelector("header").classList.add('banner-content');    
    } else {
        document.querySelector("header").classList.remove('banner-content'); 
    }

})