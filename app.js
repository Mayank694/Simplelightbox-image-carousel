


(function($) {

    $.fn.simplelightbox = function() {
        console.log(this)
        $('body').on('click','.grid-overlay',function(e){
            console.log(e.target)
            if($(e.target).hasClass('overlay') || $(e.target).hasClass('left-hand') || $(e.target).hasClass('right-hand')){
                $('body').find('.grid-overlay').remove();
                $('body').removeClass('no-scroll');
        
            }
            if($(e.target).hasClass('right')){
                $('.grid-overlay').data().carousel.next();
            }
            if($(e.target).hasClass('left')){
                
                $('.grid-overlay').data().carousel.prev();
                
            }
        })
        
        let constructOverlay = function(src){
        
            let gridOverlayDiv = $('<div/>',{
                class: 'grid-overlay'
            })
            let overlayDiv = $('<div/>',{
                class: 'overlay'
            })
            let controlsDiv = $('<div/>',{
                class: 'controls'
            })
        
            let nextAnchor  = $('<a/>',{
                class: 'next',
                href: 'javascript:void(0)'
            })
            let prevAnchor  = $('<a/>',{
                class: 'prev',
                href: 'javascript:void(0)'
            })
            let moveRightIconDiv = $('<div/>',{
                class: 'move right',
                html: '&rsaquo;'
            })
            let moveLeftIconDiv = $('<div/>',{
                class: 'move left',
                html: '&lsaquo;'
            })
            let imageDiv  = $('<div/>',{
                class: 'lightbox-image',
            })
            let image = $('<img />',{
                src:src,
                class: 'src'
            })
        
            let indexDiv = $('<div />',{
                class: 'index',
                html: "<span class='current'>4</span>/<span class='total'>5</span>"
            })
            let closeDiv = $('<div />',{
                class: 'close', 
            })
            closeDiv.append('<div class="left-hand"></div><div class="right-hand"></div>')
            gridOverlayDiv.append(overlayDiv)
            gridOverlayDiv.append(overlayDiv)
            gridOverlayDiv.append(controlsDiv);
            gridOverlayDiv.append(imageDiv)
            nextAnchor.append(moveRightIconDiv)
            prevAnchor.append(moveLeftIconDiv)
            controlsDiv.append(nextAnchor)
            controlsDiv.append(prevAnchor);
            imageDiv.append(image);
            gridOverlayDiv.append(closeDiv);
            gridOverlayDiv.append(indexDiv);
        
            return gridOverlayDiv;
        }
        
        const createCarousel = function($img){
            $('body').addClass('no-scroll')
            let src = $img.attr('src');
            let overlay = constructOverlay(src)
            $(document).find('body').append(overlay)
            $('.grid-overlay').data('carousel',new Carousel($('[data-grid]'),$('.grid-overlay'),$img))
            let newimg = $('.grid-overlay').find('img');
            let windowWidth = window.innerWidth;
            let windowHeight = window.innerHeight;
            if(windowHeight > windowWidth){
                newimg.animate({
                    width:windowWidth*4/6,
                    height: window.innerWidth*3/6,
                    opacity: 1
                },10);
            } else {
                newimg.animate({
                    width:window.innerHeight*1.2,
                    height: window.innerHeight - 100,
                    opacity: 1
                },10);
            }
        
        }
        
        let handleResize = function(){
            let windowWidth = window.innerWidth;
            let windowHeight = window.innerHeight;
            console.log(windowHeight)
            console.log(windowWidth)
            if(windowHeight > windowWidth){
                $('.grid-overlay').find('img').css({
                    width: windowWidth*4/6,
                    height: windowHeight*3/6
                });
            } else {
                $('.grid-overlay').find('img').css({
                    width: windowHeight*1.2,
                    height: windowHeight - 100
                });
            }
            
        
        }
        
        function Carousel (grid,overlay,currentImage) { 
            let $this = this;
            this.overlay = overlay;
            this.allImage = [];
            grid.find('img').each(function(e,i){
                let item = {
                    item: $(i),
                    index: e,
                    active: false
                }
                if($(this).attr('src') == currentImage.attr('src')){
                    item.active = true
                    $this.currentimageIndex = e;
                }
                $this.allImage.push(item)        
            });
            this.length = this.allImage.length;
            this.currentImage = $(currentImage);
            this.nextImage = this.getnextImage();
            this.prevImage = this.getprevImage();
            console.log(this)
        }
        
        Carousel.prototype = {
            getnextImage: function(){
                return this.allImage[this.currentimageIndex + 1] ? this.allImage[this.currentimageIndex + 1] : this.allImage[0] ;
            },
            getprevImage: function(){
                return this.allImage[this.currentimageIndex - 1]? this.allImage[this.currentimageIndex - 1] : this.allImage[this.length - 1] ; 
            },
            next: function(){
                this.currentImage = this.nextImage;
                this.setCurrentIndex('next');
                this.nextImage = this.getnextImage();
                this.prevImage = this.getprevImage();
                this.updateImage();
            },
            prev: function(){
                
                this.currentImage = this.prevImage;
                this.setCurrentIndex('prev');
                this.prevImage = this.getprevImage();
                this.nextImage = this.getnextImage();
                this.updateImage();
            },
            updateImage: function(){
                this.overlay.find('img').attr('src',this.currentImage.item.attr('src'))
                console.log(this.currentImage.index)
                
            },
            setCurrentIndex: function(action){
                if(action == 'next'  )
                this.currentimageIndex = this.length <= this.currentimageIndex ? 0 : this.currentimageIndex + 1;
                else if(action = 'prev')
                this.currentimageIndex = this.currentimageIndex < 0 ? this.length - 1 : this.currentimageIndex - 1;
            }
        }
        
        window.onresize = handleResize;

        $(document).on('click.my.carousel','[data-grid]',function(e){
            createCarousel($(e.target))
        })

    }

}(jQuery));

// CAROUSEL NO CONFLICT
// ====================






