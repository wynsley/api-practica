import "dotenv/config";
import { prisma } from "./config/prisma.js";
import { authUtils } from "./utils/auth.utils.js";

const users = [
  { fullname: "Carlos Quispe Huamán", email: "carlos.quispe@example.com", phone: "987654321", nickname: "cquispe" },
  { fullname: "María Fernanda Torres", email: "maria.torres@example.com", phone: "986543210", nickname: "mftorres" },
  { fullname: "Luis Alberto Mamani", email: "luis.mamani@example.com", phone: "985432109", nickname: "lmamani" },
  { fullname: "Ana Lucía Rojas", email: "ana.rojas@example.com", phone: "984321098", nickname: "arojas" },
  { fullname: "José Miguel Flores", email: "jose.flores@example.com", phone: "983210987", nickname: "jflores" },
  { fullname: "Rosa Elena Vargas", email: "rosa.vargas@example.com", phone: "982109876", nickname: "rvargas" },
  { fullname: "Diego Armando Salazar", email: "diego.salazar@example.com", phone: "981098765", nickname: "dsalazar" },
  { fullname: "Lucía Valeria Paredes", email: "lucia.paredes@example.com", phone: "980987654", nickname: "lparedes" },
  { fullname: "Jorge Luis Castillo", email: "jorge.castillo@example.com", phone: "979876543", nickname: "jcastillo" },
  { fullname: "Patricia Gómez Ramos", email: "patricia.gomez@example.com", phone: "978765432", nickname: "pgomez" },
  { fullname: "Miguel Ángel Chávez", email: "miguel.chavez@example.com", phone: "977654321", nickname: "mchavez" },
  { fullname: "Carmen Rosa Díaz", email: "carmen.diaz@example.com", phone: "976543210", nickname: "cdiaz" },
  { fullname: "Fernando Ríos Medina", email: "fernando.rios@example.com", phone: "975432109", nickname: "frios" },
  { fullname: "Sofía Alejandra Núñez", email: "sofia.nunez@example.com", phone: "974321098", nickname: "snunez" },
  { fullname: "Ricardo Huaman Soto", email: "ricardo.huaman@example.com", phone: "973210987", nickname: "rhuaman" },
  { fullname: "Gabriela Mendoza Cruz", email: "gabriela.mendoza@example.com", phone: "972109876", nickname: "gmendoza" },
  { fullname: "Andrés Felipe Vega", email: "andres.vega@example.com", phone: "971098765", nickname: "avega" },
  { fullname: "Valentina Cárdenas", email: "valentina.cardenas@example.com", phone: "970987654", nickname: "vcardenas" },
  { fullname: "Héctor Manuel Ponce", email: "hector.ponce@example.com", phone: "969876543", nickname: "hponce" },
  { fullname: "Daniela Silva Ortiz", email: "daniela.silva@example.com", phone: "968765432", nickname: "dsilva" },
  { fullname: "Eduardo Cáceres Lima", email: "eduardo.caceres@example.com", phone: "967654321", nickname: "ecaceres" },
  { fullname: "Claudia Ibáñez Rivera", email: "claudia.ibanez@example.com", phone: "966543210", nickname: "cibanez" },
  { fullname: "Raúl Enrique Zevallos", email: "raul.zevallos@example.com", phone: "965432109", nickname: "rzevallos" },
  { fullname: "Milagros Tapia Coronado", email: "milagros.tapia@example.com", phone: "964321098", nickname: "mtapia" },
  { fullname: "Sebastián Aguilar", email: "sebastian.aguilar@example.com", phone: "963210987", nickname: "saguilar" },
  { fullname: "Karina Yupanqui Laura", email: "karina.yupanqui@example.com", phone: "962109876", nickname: "kyupanqui" },
  { fullname: "Óscar Bedoya Linares", email: "oscar.bedoya@example.com", phone: "961098765", nickname: "obedoya" },
  { fullname: "Natalia Benavides", email: "natalia.benavides@example.com", phone: "960987654", nickname: "nbenavides" },
  { fullname: "Julio César Arias", email: "julio.arias@example.com", phone: "959876543", nickname: "jarias" },
  { fullname: "Paola Andrea Salas", email: "paola.salas@example.com", phone: "958765432", nickname: "psalas" },
];

const projects = [
  { name: "Portal web municipal", category: "Desarrollo Web", state: "DOING", startDate: "2026-01-10", endDate: null },
  { name: "App de delivery local", category: "App Móvil", state: "DOING", startDate: "2026-02-01", endDate: null },
  { name: "Migración a la nube", category: "Infraestructura", state: "DONE", startDate: "2025-06-01", endDate: "2025-12-15" },
  { name: "Dashboard de ventas", category: "Datos", state: "DOING", startDate: "2026-03-05", endDate: null },
  { name: "Campaña de temporada", category: "Marketing", state: "DONE", startDate: "2025-11-01", endDate: "2026-01-31" },
  { name: "Plataforma de cursos en línea", category: "Educación", state: "DOING", startDate: "2026-02-15", endDate: null },
  { name: "Historias clínicas digitales", category: "Salud", state: "TODO", startDate: "2026-10-15", endDate: null },
  { name: "Monitoreo de riego agrícola", category: "Agricultura", state: "DOING", startDate: "2026-04-01", endDate: null },
  { name: "Seguimiento de flota de transporte", category: "Logística", state: "DOING", startDate: "2026-01-20", endDate: null },
  { name: "Sistema de facturación electrónica", category: "Finanzas", state: "DONE", startDate: "2025-03-01", endDate: "2025-09-30" },
  { name: "Tienda virtual de artesanías", category: "Desarrollo Web", state: "DOING", startDate: "2026-05-10", endDate: null },
  { name: "App de turismo en Ica", category: "App Móvil", state: "TODO", startDate: "2026-11-01", endDate: null },
  { name: "Red WiFi para colegios", category: "Infraestructura", state: "DOING", startDate: "2026-03-15", endDate: null },
  { name: "Análisis de deserción escolar", category: "Datos", state: "DONE", startDate: "2025-08-01", endDate: "2025-12-01" },
  { name: "Rebranding de marca", category: "Marketing", state: "TODO", startDate: "2026-10-20", endDate: null },
  { name: "Aula virtual para primaria", category: "Educación", state: "TODO", startDate: "2026-10-01", endDate: null },
  { name: "Telemedicina rural", category: "Salud", state: "DOING", startDate: "2026-04-18", endDate: null },
  { name: "Trazabilidad de cosecha de uva", category: "Agricultura", state: "DOING", startDate: "2026-01-05", endDate: null },
  { name: "Optimización de rutas de reparto", category: "Logística", state: "DONE", startDate: "2025-05-01", endDate: "2025-10-20" },
  { name: "Billetera digital", category: "Finanzas", state: "DOING", startDate: "2026-06-01", endDate: null },
  { name: "Intranet corporativa", category: "Desarrollo Web", state: "DONE", startDate: "2025-04-01", endDate: "2025-08-30" },
  { name: "App de control de gastos", category: "App Móvil", state: "DOING", startDate: "2026-07-01", endDate: null },
  { name: "Backup y recuperación de desastres", category: "Infraestructura", state: "TODO", startDate: "2026-12-01", endDate: null },
  { name: "Predicción de demanda", category: "Datos", state: "DOING", startDate: "2026-05-25", endDate: null },
  { name: "Lanzamiento de producto nuevo", category: "Marketing", state: "DOING", startDate: "2026-08-01", endDate: null },
  { name: "Biblioteca digital universitaria", category: "Educación", state: "TODO", startDate: "2026-11-10", endDate: null },
  { name: "Gestión de citas médicas", category: "Salud", state: "DONE", startDate: "2025-02-01", endDate: "2025-07-15" },
  { name: "Sensores de humedad de suelo", category: "Agricultura", state: "TODO", startDate: "2026-11-15", endDate: null },
  { name: "Almacén inteligente", category: "Logística", state: "DOING", startDate: "2026-06-20", endDate: null },
  { name: "Conciliación bancaria automática", category: "Finanzas", state: "DOING", startDate: "2026-09-01", endDate: null },
];

async function main() {
  // limpiar en orden: primero la tabla puente, luego las demás
  await prisma.userProject.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();

  // un solo hash para todos (más rápido). Contraseña de prueba: Password123
  const passwordHash = await authUtils.generatePasswordHash({
    password: "Password123",
  });

  await prisma.user.createMany({
    data: users.map((u) => ({ ...u, passwordHash })),
  });
  await prisma.project.createMany({
    data: projects.map((p) => ({
      ...p,
      startDate: new Date(p.startDate),
      endDate: p.endDate ? new Date(p.endDate) : null,
    })),
  });

  // createMany no devuelve los ids, así que los leemos
  const dbUsers = await prisma.user.findMany({ orderBy: { idUser: "asc" } });
  const dbProjects = await prisma.project.findMany({ orderBy: { idProject: "asc" } });

  // cada proyecto: 1 líder + 1 a 3 trabajadores distintos
  const offsets = [1, 7, 13];
  const assignments = [];
  dbProjects.forEach((project, i) => {
    assignments.push({
      idProject: project.idProject,
      idUser: dbUsers[i % dbUsers.length].idUser,
      role: "LEADER",
    });
    const workers = (i % 3) + 1;
    for (let k = 0; k < workers; k++) {
      assignments.push({
        idProject: project.idProject,
        idUser: dbUsers[(i + offsets[k]) % dbUsers.length].idUser,
        role: "WORKER",
      });
    }
  });
  await prisma.userProject.createMany({ data: assignments });

  console.log(
    `Seed listo: ${dbUsers.length} usuarios, ${dbProjects.length} proyectos, ${assignments.length} asignaciones`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());