import { Link, createFileRoute } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import { db } from "@/db"
import { projects } from "@/db/schema"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getProjectColor } from "@/lib/colors"

const getProjects = createServerFn({ method: "GET" }).handler(async () => {
  return db.select().from(projects)
})

export const Route = createFileRoute("/")({
  loader: () => getProjects(),
  component: ProjectList,
})

function ProjectList() {
  const projectList = Route.useLoaderData()

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage and track your active projects.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projectList.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block size-2.5 rounded-full ${getProjectColor(project.id)}`}
                  />
                  <CardTitle className="text-base">{project.name}</CardTitle>
                </div>
                <Badge
                  variant={
                    project.status === "active" ? "default" : "secondary"
                  }
                >
                  {project.status}
                </Badge>
              </div>
              <CardDescription className="line-clamp-2">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground capitalize">
                  {project.priority} priority
                </span>
                <Link
                  to="/projects/$projectId"
                  params={{ projectId: project.id }}
                >
                  <Button variant="outline" size="sm">
                    View Project
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
