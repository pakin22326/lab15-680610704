import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-start pt-0 min-h-[calc(100vh-120px)] px-4">
      <Card className="w-full max-w-xl rounded-2xl border shadow-sm p-2">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            ระบบลงทะเบียนเรียน CPE & ISNE
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Link to="/enrollment">
            <Button className="bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 rounded-xl px-4 py-2 text-sm font-medium">
              ไปหน้าลงทะเบียนเรียน
            </Button>
          </Link>
        </CardContent>
      </Card>

    </div>
  );
}