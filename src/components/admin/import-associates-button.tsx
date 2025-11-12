import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, Loader2 } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

const associatesData = [
  { nombre_empresa: 'Acreditta S.A.S', tipo_organizacion: 'empresa_educativa', nombre_contacto: 'Anabella Laya', correo_contacto: 'anitalaya@acreditta.com', descripcion: 'Plataforma de certificación digital con blockchain', ubicacion: 'Colombia', segmento: 'edtech_tools' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'Ada School', tipo_organizacion: 'startup', nombre_contacto: 'Santiago Carrillo', correo_contacto: 'santiago@ada-school.org', descripcion: 'Educación técnica profesional en tecnología', ubicacion: 'Colombia', segmento: 'educacion_continua' as const, calificacion_colombia_edtech: 5 },
  { nombre_empresa: 'Adipa', tipo_organizacion: 'startup', nombre_contacto: 'Nicolas', correo_contacto: 'NICOLAS@adipa.cl', descripcion: 'Programas de estudios 100% online en psicología y salud mental', ubicacion: 'Chile', segmento: 'educacion_continua' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'ADN Educativo S.A.S', tipo_organizacion: 'startup', nombre_contacto: 'Carolina Arenas', correo_contacto: 'carolina@adntech.io', descripcion: 'Plataformas educativas con contenidos interactivos para mejorar el aprendizaje', ubicacion: 'Colombia', segmento: 'educacion_basica' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'AEIOTu', tipo_organizacion: 'empresa_educativa', nombre_contacto: 'Nehyi', correo_contacto: 'nehyi.quintero@aeiotu.org', descripcion: 'Empresa social enfocada en la primera infancia combinando educación innovadora con tecnología', ubicacion: 'Colombia', segmento: 'educacion_basica' as const, calificacion_colombia_edtech: 5 },
  { nombre_empresa: 'Aleph', tipo_organizacion: 'startup', nombre_contacto: 'Tomás Concha', correo_contacto: 'tconcha@aleph.com.co', descripcion: 'Publicación de libros y consultoría empresarial', ubicacion: 'Colombia', segmento: 'edtech_tools' as const, calificacion_colombia_edtech: 3 },
  { nombre_empresa: 'Alianza Superior Griky', tipo_organizacion: 'startup', nombre_contacto: 'Andrés Nuñez', correo_contacto: 'andres.nunez@griky.co', descripcion: 'Plataforma de aprendizaje permanente para universidades, empresas y colegios', ubicacion: 'Colombia', segmento: 'educacion_continua' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'Almia', tipo_organizacion: 'startup', nombre_contacto: 'Karen Plazas', correo_contacto: 'karen.plazas@almia.com.co', descripcion: 'Empleabilidad profesional con IA, hojas de vida y preparación para entrevistas', ubicacion: 'Colombia', segmento: 'capacitacion_empresarial' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'Arukay S.A.S', tipo_organizacion: 'startup', nombre_contacto: 'Marcelo Burbano', correo_contacto: 'marcelo.burbano@arukay.com', descripcion: 'Sistema curricular K-12 en pensamiento computacional y programación STEAM', ubicacion: 'Colombia', segmento: 'educacion_basica' as const, calificacion_colombia_edtech: 5 },
  { nombre_empresa: 'Asociación Emprender - BIRU', tipo_organizacion: 'empresa_educativa', nombre_contacto: 'July Astrid Camacho', correo_contacto: 'july.ardila@emprender.com.co', descripcion: 'Cursos en habilidades digitales, comerciales y financieras', ubicacion: 'Colombia', segmento: 'capacitacion_empresarial' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'Aula Planeta', tipo_organizacion: 'startup', nombre_contacto: 'Juan Pablo Perez', correo_contacto: 'juanpablo.perez@aulaplaneta.com', descripcion: 'Plataforma educativa con contenidos multimedia interactivos para primaria y secundaria', ubicacion: 'España', segmento: 'educacion_basica' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'Aulas Amigas (TOMi)', tipo_organizacion: 'startup', nombre_contacto: 'Santiago Bernal', correo_contacto: 'sgomez@aulasamigas.com', descripcion: 'Dispositivo todo en uno + plataforma educativa para facilitar la enseñanza', ubicacion: 'Colombia', segmento: 'edtech_tools' as const, calificacion_colombia_edtech: 5 },
  { nombre_empresa: 'Buen Data S.A.S', tipo_organizacion: 'startup', nombre_contacto: 'Hemerson Carreño', correo_contacto: 'hemerson@buendata.com', descripcion: 'Moodle Partner Premium, soluciones de e-learning en América Latina', ubicacion: 'Colombia', segmento: 'edtech_tools' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'CEINFES', tipo_organizacion: 'empresa_educativa', nombre_contacto: 'Diana Garzon', correo_contacto: 'diana.garzon@ceinfes.com', descripcion: 'Investigación educativa, innovación y formación de líderes', ubicacion: 'Colombia', segmento: 'capacitacion_empresarial' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'Cibercolegios', tipo_organizacion: 'empresa_educativa', nombre_contacto: 'Felipe Bolivar', correo_contacto: 'aida.rodriguez@cibercolegios.com', descripcion: 'Sistema de gestión educativa en línea para colegios', ubicacion: 'Colombia', segmento: 'infrastructure' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'CESA', tipo_organizacion: 'universidad', nombre_contacto: 'Juan Aristizabal', correo_contacto: 'juan.aristizabal@cesa.edu.co', descripcion: 'Universidad especializada en Administración de Empresas', ubicacion: 'Colombia', segmento: 'educacion_superior' as const, calificacion_colombia_edtech: 5 },
  { nombre_empresa: 'Comfandi', tipo_organizacion: 'caja_compensacion', nombre_contacto: 'Liliana Caicedo', correo_contacto: '', descripcion: 'Salud, educación, recreación y programas de bienestar', ubicacion: 'Colombia', segmento: 'other' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'Content Group', tipo_organizacion: 'empresa_educativa', nombre_contacto: 'Francisco Navarro', correo_contacto: 'francisco.navarro@contentgrp.com', descripcion: 'Experiencias de aprendizaje permanente y formación continua', ubicacion: 'Colombia', segmento: 'capacitacion_empresarial' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'UNIMINUTO', tipo_organizacion: 'universidad', nombre_contacto: 'Jaime Eduardo Cáceres', correo_contacto: 'jaime.caceres@uniminuto.edu', descripcion: 'Universidad con presencia nacional en educación y desarrollo comunitario', ubicacion: 'Colombia', segmento: 'educacion_superior' as const, calificacion_colombia_edtech: 5 },
  { nombre_empresa: 'Coschool', tipo_organizacion: 'startup', nombre_contacto: 'Henry May', correo_contacto: 'henry@coschool.co', descripcion: 'Desarrollo de habilidades socioemocionales con modelo Edumoción', ubicacion: 'Colombia', segmento: 'educacion_basica' as const, calificacion_colombia_edtech: 5 },
  { nombre_empresa: 'Critertec Educación S.A.S', tipo_organizacion: 'empresa_educativa', nombre_contacto: 'Sebastían Moreno', correo_contacto: 'sebastian.moreno@critertec.com', descripcion: 'Experiencias de aprendizaje innovadoras y tecnológicas', ubicacion: 'Colombia', segmento: 'edtech_tools' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'CUC University', tipo_organizacion: 'universidad', nombre_contacto: 'Jean Claude Crissien', correo_contacto: 'jcrissien@cucusa.org', descripcion: 'Universidad privada', ubicacion: 'Estados Unidos', segmento: 'educacion_superior' as const, calificacion_colombia_edtech: 3 },
  { nombre_empresa: 'Cymetria', tipo_organizacion: 'otro', nombre_contacto: 'Oscar Dueñas', correo_contacto: 'oscar.duenas@cymetria.com', descripcion: 'Aceleradora de talento digital, formación y outsourcing en TI', ubicacion: 'Colombia', segmento: 'capacitacion_empresarial' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'Danalytics', tipo_organizacion: 'empresa_educativa', nombre_contacto: 'Daniela Estrada', correo_contacto: 'destrada@danalyticspro.co', descripcion: 'Analítica avanzada y data literacy', ubicacion: 'Colombia', segmento: 'capacitacion_empresarial' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'Data School', tipo_organizacion: 'empresa_educativa', nombre_contacto: 'Luceny', correo_contacto: 'Luceny.montanez@dataschool.com.co', descripcion: 'Gestión financiera escolar para colegios', ubicacion: 'Colombia', segmento: 'infrastructure' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'EdduTrax', tipo_organizacion: 'startup', nombre_contacto: 'Andres Becerra', correo_contacto: 'eddutrax@gmail.com', descripcion: 'Transformación de colegios mediante datos y tecnología', ubicacion: 'Colombia', segmento: 'edtech_tools' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'Edu Labs S.A.S', tipo_organizacion: 'startup', nombre_contacto: 'Juan Gabriel Saenz', correo_contacto: 'juan.saenz@edu-labs.co', descripcion: 'Soluciones de e-learning para sectores educativos y corporativos', ubicacion: 'Colombia', segmento: 'edtech_tools' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'Educación Estrella', tipo_organizacion: 'empresa_educativa', nombre_contacto: 'Luis Cedeno', correo_contacto: 'lcedeno@shmacapital.com', descripcion: 'Fintech que democratiza el acceso a educación superior con financiación', ubicacion: 'Colombia', segmento: 'educacion_superior' as const, calificacion_colombia_edtech: 5 },
  { nombre_empresa: 'Edumedio', tipo_organizacion: 'startup', nombre_contacto: 'Juan Lara', correo_contacto: 'j.lara@edumedio.com', descripcion: 'Agencia de propósito especializada en proyectos educativos', ubicacion: 'Colombia', segmento: 'educacion_basica' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'ESCOLE', tipo_organizacion: 'startup', nombre_contacto: 'Alexandra Parra', correo_contacto: 'alexandra.parra@escole.com.co', descripcion: 'Experiencias de aprendizaje para facilitar la vida escolar', ubicacion: 'Colombia', segmento: 'edtech_tools' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'Escuela Didáctica S.A.S', tipo_organizacion: 'startup', nombre_contacto: 'Sebastían Rozo', correo_contacto: 'sebastian.rozo@escueladidactica.com', descripcion: 'E-learning y gestión del conocimiento con Moodle', ubicacion: 'Colombia', segmento: 'edtech_tools' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'Etraining S.A.S', tipo_organizacion: 'empresa_educativa', nombre_contacto: 'Carlos Parra', correo_contacto: 'oscarj@etraining.co', descripcion: 'Aulas virtuales e infraestructura de e-learning para población vulnerable', ubicacion: 'Colombia', segmento: 'edtech_tools' as const, calificacion_colombia_edtech: 5 },
  { nombre_empresa: 'Fundación Innovbus', tipo_organizacion: 'startup', nombre_contacto: 'Carlos Suarez', correo_contacto: 'giovana.romero@innovusbs.com', descripcion: 'Escuela de negocios y formación ejecutiva', ubicacion: 'Colombia', segmento: 'capacitacion_empresarial' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'Geek Girls LatAm', tipo_organizacion: 'startup', nombre_contacto: 'Joanna Prieto', correo_contacto: 'joanna@geekgirlslatam.org', descripcion: 'Comunidad para inspirar y empoderar mujeres en tecnología y STEAM', ubicacion: 'Colombia', segmento: 'educacion_continua' as const, calificacion_colombia_edtech: 5 },
  { nombre_empresa: 'Go Escuela', tipo_organizacion: 'empresa_educativa', nombre_contacto: 'Juan Rodriguez', correo_contacto: 'juan.alejandro_rv@goescuela.org', descripcion: 'Educación para zonas rurales sin acceso a internet', ubicacion: 'Colombia', segmento: 'educacion_basica' as const, calificacion_colombia_edtech: 5 },
  { nombre_empresa: 'HackU', tipo_organizacion: 'startup', nombre_contacto: 'Guillermo', correo_contacto: 'guillermo@hacku.co', descripcion: 'Micro-aprendizajes vía WhatsApp para trabajadores corporativos', ubicacion: 'Colombia', segmento: 'capacitacion_empresarial' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'Hec Latam', tipo_organizacion: 'empresa_educativa', nombre_contacto: 'Natalia', correo_contacto: 'natalia@hec-latam.com', descripcion: 'Asesoría en admisiones universitarias internacionales', ubicacion: 'Colombia', segmento: 'educacion_superior' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'Hypercubus S.A.S', tipo_organizacion: 'startup', nombre_contacto: 'Jole Restrepo', correo_contacto: 'jole@hypercubus.co', descripcion: 'Diseño estratégico y experiencias digitales inmersivas', ubicacion: 'Colombia', segmento: 'edtech_tools' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'i3-Technologies', tipo_organizacion: 'empresa_educativa', nombre_contacto: 'Carlos Murillo', correo_contacto: 'carlos.murillo@i3-technologies.com', descripcion: 'Soluciones interactivas para educación y corporativos', ubicacion: 'Belgica', segmento: 'edtech_tools' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'Ignite', tipo_organizacion: 'startup', nombre_contacto: 'Salomon', correo_contacto: 'Salomon.muriel@gmail.com', descripcion: 'Solución de IA para docentes y centros educativos', ubicacion: 'España', segmento: 'edtech_tools' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'InnovaHub', tipo_organizacion: 'startup', nombre_contacto: 'Oscar Rodriguez', correo_contacto: 'oscar.ivan.rodriguez@innovahub.org', descripcion: 'Gestión del conocimiento e innovación social', ubicacion: 'Colombia', segmento: 'capacitacion_empresarial' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'Innovate Learning', tipo_organizacion: 'startup', nombre_contacto: 'Valeria Velandia', correo_contacto: 'direccionfinanciera@innovatelearning.com.co', descripcion: 'Soluciones tecnológicas para formación y capacitación', ubicacion: 'Colombia', segmento: 'capacitacion_empresarial' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'La Teacher', tipo_organizacion: 'startup', nombre_contacto: 'Marcela Salinas', correo_contacto: 'marcela@lateacher.com.co', descripcion: 'Plataforma en WhatsApp para enseñar inglés a niños', ubicacion: 'Colombia', segmento: 'educacion_basica' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'Laboratoria', tipo_organizacion: 'startup', nombre_contacto: 'Paola Sierra', correo_contacto: 'paola.sierra@laboratoria.la', descripcion: 'Bootcamps gratuitos para capacitar mujeres en tecnología', ubicacion: 'Perú', segmento: 'educacion_continua' as const, calificacion_colombia_edtech: 5 },
  { nombre_empresa: 'Makaia', tipo_organizacion: 'startup', nombre_contacto: 'Ana Isabel Restrepo', correo_contacto: 'ana.restrepo@makaia.org', descripcion: 'Organización social combinando tecnología, cooperación e innovación', ubicacion: 'Colombia', segmento: 'capacitacion_empresarial' as const, calificacion_colombia_edtech: 5 },
  { nombre_empresa: 'Mangus S.A.S', tipo_organizacion: 'startup', nombre_contacto: 'Harold Combita', correo_contacto: 'hello@haroldcombita.com', descripcion: 'Sistemas y plataformas de e-learning corporativo', ubicacion: 'Colombia', segmento: 'capacitacion_empresarial' as const, calificacion_colombia_edtech: 5 },
  { nombre_empresa: 'MenteX', tipo_organizacion: 'startup', nombre_contacto: 'Claudia Aparicio', correo_contacto: 'claudia@mentex.co', descripcion: 'Desarrollo de talento y culturas organizacionales', ubicacion: 'Colombia', segmento: 'capacitacion_empresarial' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'Mentu', tipo_organizacion: 'startup', nombre_contacto: 'Jose', correo_contacto: 'jose@mentu.co', descripcion: 'Aprendizaje personalizado con IA para cerrar brecha educativa', ubicacion: 'Colombia', segmento: 'educacion_continua' as const, calificacion_colombia_edtech: 5 },
  { nombre_empresa: 'Merahki', tipo_organizacion: 'startup', nombre_contacto: 'David', correo_contacto: 'david@merahki.ai', descripcion: 'Aprendizaje corporativo con tecnología avanzada', ubicacion: 'Colombia', segmento: 'capacitacion_empresarial' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'MindHub', tipo_organizacion: 'startup', nombre_contacto: 'Lilian Mora', correo_contacto: 'lilian@mindhubweb.com', descripcion: 'Academia de programación con bootcamps intensivos para jóvenes', ubicacion: 'Colombia', segmento: 'educacion_continua' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'Naska Digital', tipo_organizacion: 'startup', nombre_contacto: 'Leonardo Lamprea', correo_contacto: 'leonardolamprea@nsdis.com', descripcion: 'Capacitación en Animación 2D/3D, visualización y tecnologías BIM', ubicacion: 'Colombia', segmento: 'capacitacion_empresarial' as const, calificacion_colombia_edtech: 3 },
  { nombre_empresa: 'Nucleo Software S.A.S', tipo_organizacion: 'empresa_educativa', nombre_contacto: 'Camilo Rivillas', correo_contacto: 'marcelaotalvaro@nusoft.com.co', descripcion: 'Soluciones de gestión escolar', ubicacion: 'Colombia', segmento: 'infrastructure' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'Panzofi', tipo_organizacion: 'startup', nombre_contacto: 'Juan Igua', correo_contacto: 'juanigua@panzofi.com', descripcion: 'Plataforma gratuita de contenido educativo colaborativo', ubicacion: 'Colombia', segmento: 'educacion_continua' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'Rebel School', tipo_organizacion: 'startup', nombre_contacto: 'David Hernández', correo_contacto: 'david@therebelschool.com', descripcion: 'Escuela de emprendimiento con modelos innovadores sin inversión inicial', ubicacion: 'Colombia', segmento: 'capacitacion_empresarial' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'Revive', tipo_organizacion: 'startup', nombre_contacto: 'Sebastian', correo_contacto: 'sebastian@gprevive.com', descripcion: 'Capacitación continua para personal de salud con cursos certificados', ubicacion: 'Colombia', segmento: 'capacitacion_empresarial' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'Robotica Colombia S.A.S', tipo_organizacion: 'empresa_educativa', nombre_contacto: 'Oskar Vanegas', correo_contacto: 'oskar@tdrobotica.co', descripcion: 'Integración de robots industriales y educación en automatización', ubicacion: 'Colombia', segmento: 'educacion_continua' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'Robotschool', tipo_organizacion: 'empresa_educativa', nombre_contacto: 'Santiago Puchana', correo_contacto: 'Santiago@rbscali.com', descripcion: 'Escuela de robótica en STEAM', ubicacion: 'Colombia', segmento: 'educacion_basica' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'Scala Learning', tipo_organizacion: 'empresa_educativa', nombre_contacto: 'Angela Andrade', correo_contacto: 'angela.andrade@scalalearning.com', descripcion: 'Transformación de educación superior con soluciones digitales', ubicacion: 'Internacional', segmento: 'educacion_superior' as const, calificacion_colombia_edtech: 5 },
  { nombre_empresa: 'Selecu - Cosmo', tipo_organizacion: 'startup', nombre_contacto: 'Lorena Avilés', correo_contacto: 'lorenaaviles@cosmo.edu.c', descripcion: 'Evaluación del aprendizaje a través de tecnología, narrativa y juego', ubicacion: 'Colombia', segmento: 'edtech_tools' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'Sistel', tipo_organizacion: 'startup', nombre_contacto: 'Eyal Rosen', correo_contacto: 'david@sistel.co', descripcion: 'Soluciones de e-learning corporativo', ubicacion: 'Colombia', segmento: 'capacitacion_empresarial' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'Sistema Saberes', tipo_organizacion: 'startup', nombre_contacto: 'Nicolas Cedano', correo_contacto: 'juan.cedano@saberes.com', descripcion: 'Plataforma de gestión integral para colegios', ubicacion: 'Colombia', segmento: 'infrastructure' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'Studyatgenuine', tipo_organizacion: 'red_instituciones', nombre_contacto: 'Liliana', correo_contacto: 'linamariaramirezgomez@gmail.com', descripcion: 'Colegio virtual internacional bilingüe', ubicacion: 'Estados Unidos', segmento: 'educacion_basica' as const, calificacion_colombia_edtech: 3 },
  { nombre_empresa: 'TusTrabajos.co', tipo_organizacion: 'empresa_educativa', nombre_contacto: 'Juan Cardenas', correo_contacto: 'juancardenasceo@tustrabajos.co', descripcion: 'Plataforma de servicios académicos y apoyo escolar/universitario', ubicacion: 'Colombia', segmento: 'educacion_continua' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'Universidad de La Sabana', tipo_organizacion: 'universidad', nombre_contacto: 'Daniela Lopez', correo_contacto: 'Daniela.lopez@u-planner.com', descripcion: 'Universidad privada en Chía, enfoque en administración, comunicación y salud', ubicacion: 'Colombia', segmento: 'educacion_superior' as const, calificacion_colombia_edtech: 5 },
  { nombre_empresa: 'Universidad EAFIT', tipo_organizacion: 'universidad', nombre_contacto: 'Manuela', correo_contacto: 'manuela.pena1@unisabana.edu.co', descripcion: 'Universidad privada en Medellín con programas de ingeniería y negocios', ubicacion: 'Colombia', segmento: 'educacion_superior' as const, calificacion_colombia_edtech: 5 },
  { nombre_empresa: 'U-Planner', tipo_organizacion: 'startup', nombre_contacto: 'Jose Betancur', correo_contacto: 'josebetancur@eafit.edu.co', descripcion: 'Sistema de operaciones académicas con análisis de datos e IA', ubicacion: 'Estados Unidos', segmento: 'edtech_tools' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'Wizi-Learn', tipo_organizacion: 'startup', nombre_contacto: 'Ignacio', correo_contacto: 'ignacio@wizi-learn.com', descripcion: 'IA conversacional para educación personalizada', ubicacion: 'Colombia', segmento: 'edtech_tools' as const, calificacion_colombia_edtech: 4 },
  { nombre_empresa: 'Z1B', tipo_organizacion: 'startup', nombre_contacto: 'Julio Pertuz', correo_contacto: 'julio.pertuz@z1b.co', descripcion: 'Educación financiera gamificada para equipos', ubicacion: 'Colombia', segmento: 'capacitacion_empresarial' as const, calificacion_colombia_edtech: 4 }
]

export function ImportAssociatesButton() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleImport = async () => {
    if (!confirm('¿Está seguro de que desea importar 70 asociados? Esta acción no se puede deshacer.')) {
      return
    }

    setIsLoading(true)

    try {
      const { error } = await supabase
        .from('asociados')
        .insert(associatesData.map(associate => ({
          ...associate,
          estado: 'activo' as const,
          acepta_uso_datos: true,
          fecha_ingreso: new Date().toISOString().split('T')[0],
          calificacion_colombia_edtech: associate.calificacion_colombia_edtech || 4
        })))

      if (error) throw error

      toast({
        title: "Importación exitosa",
        description: `Se han importado ${associatesData.length} asociados correctamente.`,
      })

      // Reload the page to show the new associates
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (error: any) {
      console.error('Error importing associates:', error)
      toast({
        title: "Error al importar",
        description: error.message || "Hubo un error al importar los asociados.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button 
      onClick={handleImport} 
      disabled={isLoading}
      variant="outline"
      className="gap-2"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Importando...
        </>
      ) : (
        <>
          <Upload className="h-4 w-4" />
          Importar 70 Asociados
        </>
      )}
    </Button>
  )
}
