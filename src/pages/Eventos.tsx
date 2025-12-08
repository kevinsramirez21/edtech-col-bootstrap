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

      <Section className="py-8 bg-gray-50">
        <Breadcrumbs 
          items={[
            { label: "Eventos" }
          ]} 
        />
      </Section>
      
      <Section className="py-20 sm:py-28 lg:py-36">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-primary-100 flex items-center justify-center">
                <Calendar className="w-12 h-12 sm:w-16 sm:h-16 text-primary-700" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent-brand flex items-center justify-center">
                <Construction className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-900 mb-4">
            Eventos
          </h1>
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-800 font-medium text-sm mb-6">
            <Construction className="w-4 h-4" />
            En construcción
          </div>

          {/* Description */}
          <p className="text-lg sm:text-xl text-primary-900/70 mb-8 leading-relaxed">
            Estamos preparando esta sección para ti. Aquí podrás encontrar todos los 
            <span className="font-semibold text-primary-900"> futuros eventos, encuentros y actividades </span>
            del ecosistema EdTech colombiano.
          </p>

          {/* Coming soon details */}
          <div className="bg-white rounded-2xl border border-border/50 p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-semibold text-primary-900 mb-4">
              Próximamente podrás:
            </h2>
            <ul className="text-left space-y-3 text-primary-900/70">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</span>
                <span>Ver el calendario de eventos del ecosistema EdTech</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</span>
                <span>Registrarte para webinars, summits y encuentros presenciales</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</span>
                <span>Acceder a grabaciones y materiales de eventos pasados</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</span>
                <span>Conectar con otros miembros del ecosistema</span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <p className="mt-8 text-sm text-primary-900/60">
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
