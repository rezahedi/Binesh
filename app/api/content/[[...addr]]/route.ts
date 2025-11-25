import {withAdmin} from "@/lib/auth";
import {NextResponse} from "next/server";
import {promises as fs} from "fs";
import matter from "gray-matter";
import path from "path";
import {parseSections, SectionType} from "@/lib/quizParser";

export const GET = withAdmin(async ({params}: {params: {addr?: string[]}}) => {
  if (!params.addr)
    return NextResponse.json({message: `File not provided`}, {status: 404});

  const filePath = path.join(process.cwd(), "app", "contents", ...params.addr);

  try {
    const fileContent = await fs.readFile(filePath, "utf8");

    if (!fileContent.trim())
      return NextResponse.json({message: "File is empty"}, {status: 404});

    const {data, content} = matter(fileContent);
    const steps: SectionType[] = parseSections(content);

    return NextResponse.json({
      addr: params.addr,
      path: filePath,
      data: {...data, steps},
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({message: "File not found"}, {status: 404});
  }
});
