import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

interface RulesHeaderProps {
  onAddRule: () => void
}

export function RulesHeader({ onAddRule }: RulesHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold">Moderation Rules</h1>

      <Button onClick={onAddRule}>
        <Plus className="mr-2 h-4 w-4" />
        Add Rule
      </Button>
    </div>
  )
}
