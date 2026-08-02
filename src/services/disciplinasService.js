import supabase from "./supabaseClient";
import LIST_OF_COURSES from "../components/Disciplinas/list_of_courses";

const localDisciplinas = LIST_OF_COURSES.map((course) => ({
  id: course.id,
  nombre: course.name,
  icono: course.icon,
  descripcion: course.description,
  tarifas: course.numberOfClasses.map((classOption) => ({
    label: classOption.label,
    precio: classOption.price,
  })),
}));

export const getDisciplinas = async () => {
  if (!supabase) {
    return localDisciplinas;
  }

  const { data, error } = await supabase
    .from("disciplinas")
    .select(`*, tarifas (*)`)
    .eq("activo", true);

  if (error) {
    console.warn("Error fetching disciplinas, using local data:", error);
    return localDisciplinas;
  }

  return data;
};
