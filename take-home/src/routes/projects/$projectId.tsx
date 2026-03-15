import { Link, createFileRoute } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { notes, projects } from "@/db/schema"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getProjectColor } from "@/lib/colors"

const getProject = createServerFn({ method: "GET" })
  .inputValidator((projectId: string) => projectId)
  .handler(async ({ data: projectId }) => {
    const rows = await db
      .select()
      .from(projects)
      .where(eq(projects.id, projectId))

    const project = rows[0] as (typeof rows)[0] | undefined
    if (!project) {
      throw new Error("Project not found")
    }

    const projectNotes = await db
      .select()
      .from(notes)
      .where(eq(notes.projectId, projectId))

    return { project, notes: projectNotes }
  })

export const Route = createFileRoute("/projects/$projectId")({
  loader: ({ params }) => getProject({ data: params.projectId }),
  component: ProjectDetail,
})

function ProjectDetail() {
  const { project, notes: projectNotes } = Route.useLoaderData()

  return (
    <div>
      <div className="mb-6">
        <Link to="/">
          <Button variant="ghost" size="sm">
            &larr; Back to Projects
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <div className="flex items-start gap-3">
          <span
            className={`mt-2 inline-block size-3 rounded-full ${getProjectColor(project.id)}`}
          />
          <h1 className="text-2xl font-semibold">{project.name}</h1>
          <Badge
            variant={project.status === "active" ? "default" : "secondary"}
          >
            {project.status}
          </Badge>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {project.description}
        </p>
        <p className="mt-1 text-xs text-muted-foreground capitalize">
          {project.priority} priority
        </p>
      </div>

      <Separator className="my-6" />

      <div>
        <h2 className="mb-4 text-lg font-medium">Notes</h2>
        {projectNotes.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No notes yet for this project.
          </p>
        ) : (
          <div className="space-y-4">
            {projectNotes.map((note) => (
              <Card key={note.id}>
                <CardHeader>
                  <CardTitle className="text-sm">{note.title}</CardTitle>
                  <CardDescription className="text-xs">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{note.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
