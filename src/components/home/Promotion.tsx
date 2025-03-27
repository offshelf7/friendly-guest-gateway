
import BlurImage from '../ui/BlurImage';

const Promotion = () => {
  return (
    <section id="promotions" className="py-24 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 fade-in-up">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
            Special Offers
          </h2>
          <p className="text-lg text-slate-600">
            Take advantage of our exclusive packages and promotions for an enhanced experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Promotion Card 1 */}
          <div className="group rounded-2xl overflow-hidden shadow-md hover-scale border border-slate-100">
            <div className="relative h-64">
              <BlurImage
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
                alt="Weekend Getaway Package"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-slate-900">
                Save 20%
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Weekend Getaway Package</h3>
              <p className="text-slate-600 mb-4">
                Escape the routine with our weekend package including luxury accommodation, 
                breakfast, and spa access for two.
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm text-slate-500 line-through">$599</span>
                  <span className="text-xl font-bold text-slate-900 ml-2">$479</span>
                  <span className="text-slate-600 text-sm"> / night</span>
                </div>
                <a 
                  href="#book" 
                  className="text-slate-900 font-medium hover:text-slate-700 transition-colors flex items-center"
                >
                  Book Now
                  <span className="ml-1 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Promotion Card 2 */}
          <div className="group rounded-2xl overflow-hidden shadow-md hover-scale border border-slate-100">
            <div className="relative h-64">
              <BlurImage
                src="https://images.unsplash.com/photo-1551918120-9739cb430c6d?q=80&w=2187&auto=format&fit=crop"
                alt="Romantic Dinner Package"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-slate-900">
                Limited Time
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Romantic Dinner Package</h3>
              <p className="text-slate-600 mb-4">
                Enjoy a magical evening with a five-course dinner prepared by our executive chef, 
                paired with premium wines.
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xl font-bold text-slate-900">$199</span>
                  <span className="text-slate-600 text-sm"> / couple</span>
                </div>
                <a 
                  href="#book" 
                  className="text-slate-900 font-medium hover:text-slate-700 transition-colors flex items-center"
                >
                  Reserve
                  <span className="ml-1 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Large Promotion Banner */}
        <div className="rounded-2xl overflow-hidden relative">
          <BlurImage
            src="https://images.unsplash.com/photo-1568084680786-a84f91d1153c?q=80&w=2074&auto=format&fit=crop"
            alt="Summer Special Promotion"
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/40"></div>
          <div className="absolute inset-0 flex items-center px-8 md:px-12">
            <div className="max-w-xl">
              <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-1 text-white text-sm inline-block mb-4">
                Limited Time Offer
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Summer Special: Stay 4, Pay 3</h3>
              <p className="text-white/90 mb-6 text-lg">
                Book four nights and only pay for three. Includes daily breakfast, 
                welcome drinks, and a complimentary dinner at our signature restaurant.
              </p>
              <a 
                href="#book" 
                className="btn-shine bg-white text-slate-900 hover:bg-slate-100 px-6 py-3 rounded-full font-medium inline-block transition-all"
              >
                Explore Offer
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promotion;
