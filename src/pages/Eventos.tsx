import { Helmet } from "react-helmet-async"
import { Section } from "@/components/ui/section"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Calendar, Construction } from "lucide-react"

const Eventos = () => {
  return (
    <>
      <Helmet>
        <title>Eventos - Colombia EdTech</title>
        <meta name="description" content="Próximamente: eventos y encuentros del ecosistema EdTech colombiano" />
      </Helmet>

      <Section className="py-6 sm:py-8 bg-gray-50">
        <Breadcrumbs 
          items={[
            { label: "Eventos" }
          ]} 
        />
      </Section>
      
      <Section className="py-12 sm:py-20 lg:py-28 xl:py-36">
        <div className="max-w-2xl mx-auto text-center px-4 sm:px-6">
          {/* Icon */}
          <div className="mb-6 sm:mb-8 flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full bg-primary-100 flex items-center justify-center">
                <Calendar className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-primary-700" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-accent-brand flex items-center justify-center">
                <Construction className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-900 mb-3 sm:mb-4">
            Eventos
          </h1>
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-amber-100 text-amber-800 font-medium text-xs sm:text-sm mb-4 sm:mb-6">
            <Construction className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            En construcción
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg lg:text-xl text-primary-900/70 mb-6 sm:mb-8 leading-relaxed">
            Estamos preparando esta sección para ti. Aquí podrás encontrar todos los 
            <span className="font-semibold text-primary-900"> futuros eventos, encuentros y actividades </span>
            del ecosistema EdTech colombiano.
          </p>

          {/* Coming soon details */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-border/50 p-5 sm:p-6 lg:p-8 shadow-sm">
            <h2 className="text-base sm:text-lg font-semibold text-primary-900 mb-3 sm:mb-4">
              Próximamente podrás:
            </h2>
            <ul className="text-left space-y-2.5 sm:space-y-3 text-sm sm:text-base text-primary-900/70">
              <li className="flex items-start gap-2.5 sm:gap-3">
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0 mt-0.5">1</span>
                <span>Ver el calendario de eventos del ecosistema EdTech</span>
              </li>
              <li className="flex items-start gap-2.5 sm:gap-3">
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0 mt-0.5">2</span>
                <span>Registrarte para webinars, summits y encuentros presenciales</span>
              </li>
              <li className="flex items-start gap-2.5 sm:gap-3">
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0 mt-0.5">3</span>
                <span>Acceder a grabaciones y materiales de eventos pasados</span>
              </li>
              <li className="flex items-start gap-2.5 sm:gap-3">
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0 mt-0.5">4</span>
                <span>Conectar con otros miembros del ecosistema</span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-primary-900/60">
            ¿Tienes un evento que quieres compartir? Escríbenos a{" "}
            <a href="mailto:kevin@colombiaedtech.org" className="text-primary-700 hover:underline font-medium">
              kevin@colombiaedtech.org
            </a>
          </p>
        </div>
      </Section>
    </>
  )
}

export default Eventos
