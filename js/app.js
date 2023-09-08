const getElement = {
  one: selector => document.querySelector(selector),
  all: selector => document.querySelectorAll(selector),
}

new Swiper('#testimonials-slider', {
  autoplay: {
    delay: 2500,
  },
  navigation: {
    nextEl: '.testimonials-arrow-next',
    prevEl: '.testimonials-arrow-prev',
  },
})

new Swiper('#header-preview__slider', {
  spaceBetween: 30,
  effect: 'fade',
  parallax: true,
  autoplay: {
    delay: 2500,
  },
  navigation: {
    nextEl: '.header-preview-next',
    prevEl: '.header-preview-prev',
  },
})

new Swiper('#featured-slider', {
  slidesPerView: 2,
  autoplay: {
    delay: 2500,
  },
  breakpoints: {
    300: {
      slidesPerView: 1,
    },
    500: {
      slidesPerView: 2,
    },
  },
})

new Swiper('#services-slider', {
  spaceBetween: 20,
  autoplay: {
    delay: 2500,
  },
})

new Swiper('#service-slider', {
  spaceBetween: 20,
  autoplay: {
    delay: 2500,
  },
})

const resolutionFormSlider = new Swiper('#resolution-form-slider', {
  spaceBetween: 10,
  navigation: {
    nextEl: '.resolution-form-next',
    prevEl: '.resolution-form-prev',
  },
  noSwipingClass: 'swiper-slide',
})

const animated = () => {
  const elements = document.querySelectorAll('[data-animation-classes]')

  elements.forEach(item => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(item => {
        if (item.isIntersecting) {
          const clasess = item.target.dataset.animationClasses.split(' ')
          clasess.forEach(cls => item.target.classList.add(cls))
        }
      })
    })

    observer.observe(item)
  })
}

const counterUp = () => {
  const counterItems = document.querySelectorAll('[data-counter]')
  let interval = 1

  counterItems.forEach(count => {
    let startValue = 0
    let endValue = parseInt(count.getAttribute('data-counter'))
    let duration = Math.floor(interval / endValue)

    let counter = setInterval(() => {
      startValue += 1.1

      if (startValue <= 100000) {
        startValue += 1000.1
      }
      if (startValue >= 100000 && !(startValue >= 2000000)) {
        startValue += 10000.1
      }

      if (startValue >= 2000000) {
        startValue += 1000.11
      }

      if (startValue >= 2000000 && startValue <= endValue) {
        clearInterval(counter)
        count.textContent = count.getAttribute('data-counter-end')
      } else {
        count.textContent = new Intl.NumberFormat('en-us', {
          currency: 'USD',
          style: 'currency',
        })
          .format(startValue)
          .substring(1)
      }
    }, duration)
  })
}

const isViewCounter = () => {
  const counters = document.querySelectorAll('[data-counter]')

  counters.forEach(counter => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(item => {
        if (item.isIntersecting) {
          counterUp()
        }
      })
    })

    observer.observe(counter)
  })
}

const accordion = () => {
  const items = getElement.all('.faq-accordion')
  const activeClass = 'faq-accordion--active'

  items.forEach(item => {
    item.addEventListener('click', () => {
      items.forEach(item => item.classList.remove(activeClass))

      item.classList.toggle(activeClass)
    })
  })
}

const showDropDownMenu = () => {
  const activeClass = 'navbar-list--active'
  const navLinks = getElement.all('.nav-link')

  navLinks.forEach(item => {
    item.addEventListener('mouseover', e => {
      e.preventDefault()
      const list = getElement.one(`#${e.target.dataset.id}`)

      if (list) {
        list.classList.add(activeClass)

        item.addEventListener('mouseleave', () => {
          list.classList.remove(activeClass)
        })

        list.addEventListener('mouseleave', () => {
          list.classList.remove(activeClass)
        })

        list.addEventListener('mouseover', e => {
          if (e.target) {
            list.classList.add(activeClass)
          }
        })
      }
    })
  })
}

const toggleMenu = () => {
  const menuBtn = getElement.one('#open-menu')
  const menu = getElement.one('.header-menu')

  menuBtn?.addEventListener('click', () => {
    menuBtn.classList.toggle('header-open__menu--active')
    menu.classList.toggle('header-menu--active')
  })
}

const toggleSubMenu = () => {
  const menuItems = [
    ...getElement.all('.menu-item--list'),
    ...getElement.all('.item-list--opened'),
  ]

  menuItems.forEach(item => {
    const icon = item.querySelector('.head-icon')

    icon.addEventListener('click', () => {
      item.classList.toggle('menu-item--active')
      item.classList.toggle('item-list--active')
    })
  })
}

const tabs = () => {
  const tabActiveClass = 'tabs-content--active'
  const btnActiveClass = 'head-btn--active'
  const btns = getElement.all('button[data-tabid]')
  const contents = getElement.all('[data-tab-content]')

  btns.forEach(btn => {
    btn.addEventListener('click', e => {
      const content = getElement.one(`#${e.target.dataset.tabid}`)

      btns.forEach(item => item.classList.remove(btnActiveClass))
      contents.forEach(item => item.classList.remove(tabActiveClass))

      btn.classList.add(btnActiveClass)
      content.classList.add(tabActiveClass)
    })
  })

  btns[0]?.click()
}

const submitResolutionForm = () => {
  const form = getElement.one('#resolution-form')
  const select = getElement.one('#head-select')

  form?.addEventListener('submit', e => {
    e.preventDefault()

    const { first_name, last_name, email, phone } = e.target
    const selectedEl = [...getElement.all('.prices-price[data-selected]')]

    const selectedItems = selectedEl.map(item => {
      const key =
        item.parentNode.parentNode.querySelector('.head-title').innerText
      const title = item.innerText

      return {
        [key]: title,
      }
    })

    const data = {
      firstName: first_name.value,
      lastName: last_name.value,
      email: email.value,
      phone: phone.value,
      selectedItems,
      [select.name]: select.value,
    }

    console.log('formdata', data)
  })
}

const formSelectItems = swiper => {
  const btns = getElement.all('.prices-price[data-slide-btn-select]')
  const select = getElement.one('#head-select')

  btns.forEach(item => {
    item.addEventListener('click', () => {
      const slideId = item.dataset.slideBtnSelect

      swiper.slideTo(slideId)
      item.setAttribute('data-selected', true)
    })
  })

  select?.addEventListener('change', () => {
    swiper.slideTo(4)
  })
}

resolutionFormSlider.on('slideChange', function () {
  const select = getElement.one('#head-select')

  if (select.value.length) {
    this.slideTo(4)
  }
})

accordion()
showDropDownMenu()
toggleMenu()
toggleSubMenu()
tabs()
formSelectItems(resolutionFormSlider)
submitResolutionForm()
animated()
isViewCounter()
