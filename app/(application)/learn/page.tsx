import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { CourseCard, Streak } from "@application/components";

export default async function ApplicationPage() {
  const session = await getServerSession(authOptions);

  const fakeCourses01 = [
    {
      image: "https://ds055uzetaobb.cloudfront.net/category-images/Home_LLP_Illustrations_CS_2x-G6468Y.png",
      name: "Programming with Python",
      slug: "programming-with-python",
      category: "CS & Programming",
      description: "",
      level: "2",
      progress: 15
    },
    {
      image: "https://ds055uzetaobb.cloudfront.net/category-images/Home_LLP_Illustrations_Science_2x-pzKyWT.png",
      name: "Scientific Thinking",
      slug: "scientific-thinking",
      category: "Science",
      description: "",
      level: "1",
      progress: 34
    },
    {
      image: "https://ds055uzetaobb.cloudfront.net/chapter/logic-HzWHci.png",
      name: "Logic",
      slug: "logic",
      category: "Mathematics",
      description: "",
      level: "3",
      progress: 67
    },
    {
      image: "https://ds055uzetaobb.cloudfront.net/chapter/search_engines-7eREls.png",
      name: "Search Engines",
      slug: "search-engines",
      category: "Computer Science",
      description: "",
      level: "2",
      progress: -1,
    }
  ];
  const fakeCourses02 = [
    {
      image: "https://ds055uzetaobb.cloudfront.net/brioche/chapter/CreativeCoding-0UXjZM.png",
      name: "Creative Coding",
      slug: "creative-coding",
      category: "CS & Programming",
      description: "",
      level: "2",
      progress: -1,
    },
    {
      image: "https://ds055uzetaobb.cloudfront.net/brioche/chapter/Unlocking_Rental_Value_on_Airbnb-q5fgR6.png",
      name: "Case Study: Unlocking Rental Value on Airbnb",
      slug: "case-study-unlocking-rental-value-on-airbnb",
      category: "Data Analysis",
      description: "",
      level: "31",
      progress: -1,
    },
    {
      image: "https://ds055uzetaobb.cloudfront.net/brioche/chapter/Going_Viral_on_X-5fajSI.png",
      name: "Going Viral on X",
      slug: "going-viral-on-x",
      category: "Data Analysis",
      description: "",
      level: "2",
      progress: 3
    },
    {
      image: "https://ds055uzetaobb.cloudfront.net/brioche/chapter/Group_22039-1OE8tE.png",
      name: "Modeling with Multiple Variables",
      slug: "modeling-with-multiple-variables",
      category: "Economics",
      description: "",
      level: "5",
      progress: 31
    }
  ];

  if( session )
    return <div className="space-y-4">
      <div className="container flex flex-col md:flex-row gap-4">
        <div className="basis-8/12">
          <Streak />
        </div>
        <div className="basis-4/12 bg-orange-200 border rounded-md border-orange-300 p-4">
          Premium users are 6x more likely to reach their learning goals
          <button>Learn more</button>
        </div>
      </div>
      <div className="container flex gap-4">
        <div className="w-1/2">
          <h3 className="font-semibold text-xl">Pick up where you left off</h3>
          <div className="border rounded-md p-4 h-52"></div>
        </div>
        <div className="w-1/2">
          <h3 className="font-semibold text-xl">Carbon League</h3>
          <div className="border rounded-md p-4 h-52"></div>
        </div>
      </div>
      <div className="container">
        <h3 className="py-3 font-semibold text-xl">Continue learning</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {fakeCourses01.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>
      <div className="container">
        <h3 className="py-3 font-semibold text-xl">Recommended for you</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {fakeCourses02.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>
      {/* <p>Signed in as {session.user && session.user.name}</p>
      <a href="/api/auth/signout">Sign out by link</a> */}
    </div>

  return (
    <div>
      <p>Not signed in</p>
    </div>
  )
}
