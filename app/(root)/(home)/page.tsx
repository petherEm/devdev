import { Button } from "@/components/ui/button";
import Link from "next/link";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import Filter from "@/components/shared/Filter";
import { HomePageFilters } from "@/constants/filters";
import HomeFilters from "@/components/home/HomeFilters";

import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/cards/QuestionCard";

import { getQuestions } from "@/lib/actions/question.action";

// const questions = [
//   {
//     _id: 1,
//     title: "Cascading Style Sheets (CSS) is a style sheet language.",
//     tags: [
//       { _id: 1, name: "python" },
//       { _id: 2, name: "javascript" },
//     ],
//     author: { _id: "1", name: "John Doe", picture: "john-doe.jpg" },
//     upvotes: 10,
//     views: 100,
//     answers: [],
//     createdAt: new Date("2021-09-09T12:10:00.000Z"),
//   },
//   {
//     _id: 2,
//     title: "How to center a div?",
//     tags: [
//       { _id: 1, name: "css" },
//       { _id: 2, name: "javascript" },
//     ],
//     author: { _id: "1", name: "John Doe", picture: "john-doe.jpg" },
//     upvotes: 10,
//     views: 100,
//     answers: [],
//     createdAt: new Date("2021-09-09T12:10:00.000Z"),
//   },
// ];

export default async function Home() {
  const result = await getQuestions({});

  console.log(result.questions);

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />

        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {/* Looping through questions */}

        {result.questions.length > 0 ? (
          result.questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There is no question to show"
            description="Be the first to break the silence! Ask a question and kickstart the
          discussion. Your query could be the next big things others learn from.
          Get involved!"
            link="/ask-question"
            linkTitle="Ask Question"
          />
        )}
      </div>
    </>
  );
}
