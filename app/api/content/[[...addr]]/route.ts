// TODO: This entire code not checked yet

import { PrismaClient } from "@prisma/client"
import { withAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";
import { promises as fs } from 'fs';

const prisma = new PrismaClient();


export const GET = withAdmin(async ({ params }: { params: { addr?: string[] } }) => {

  if(!params.addr)
    return NextResponse.json({ message: `File not provided` }, { status: 404 });

  const filePath = params.addr.join("/");

  return await fs.readFile( `${process.cwd()}/app/contents/${filePath}`, 'utf8').then(data => {
    let fileContent = data;

    if( fileContent === "" )
      return NextResponse.json({ message: `File doesn't have content` }, { status: 404 });

    // TODO: Process the fileContent and return it as a formatted json
    // Find the steps in the file content starting with \#\#\s and ending before the next \#\#\s or the end of the file

    // Process the steps
    // const steps: string[] = fileContent.match(/(##\s([^##])*)/gm) || [];
    const steps: string[] = fileContent.split('## ');

    if(!steps)
      return NextResponse.json({ message: `No steps found` }, { status: 404 });

    // Process the steps and return title and content
    let detailedSteps: ({title: string, content: string, quiz: string} | null)[] = [];
    detailedSteps = steps.filter(step => step.trim() !== '').map(step => {
      const matches = splitAtFirst(step.trim(), '\r\n');
      if(!matches)
        return null;

      // Process the quiz from the content
      const [, content, quiz] = matches[1].match(/([^`]+)```md\r\n([^`]+)```/m) || [, matches[1], '']

      return { title: matches[0], content, quiz };
    });

    return NextResponse.json({ addr: params.addr , path: filePath, steps: detailedSteps });
  }).catch(err => {
    console.log(err);
    return NextResponse.json({ message: `File not found` }, { status: 404 });
  });


  // TODO: If the file doesn't exists, return a 404 error

  // If course doesn't exists
  // if(!response)
  //   return NextResponse.json({ message: `Course not found` }, { status: 404 });

  // return NextResponse.json(response);
});

const splitAtFirst = (str: string, delimiter: string) => {
  const index = str.indexOf(delimiter);
  return [str.slice(0, index), str.slice(index + delimiter.length)];
}