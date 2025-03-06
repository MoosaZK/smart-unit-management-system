import React from 'react'
import { Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Smart Unit Management System</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Link href="/hr-management">
          <UnitCard title="HR Management" content="This is the first card content." />
        </Link>
        <UnitCard title="Unit Two" content="This is the second card content." />
        <UnitCard title="Unit Three" content="This is the third card content." />
        <UnitCard title="Unit Four" content="This is the fourth card content." />
      </div>
    </main>
  )
}

function UnitCard({ title, content }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{content}</p>
      </CardContent>
    </Card>
  )
}
