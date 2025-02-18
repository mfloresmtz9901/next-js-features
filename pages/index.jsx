import Head from "next/head";

import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React Meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>
    </>
  );
}

export async function getStaticProps() {
  //fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://admin:Calibanito_8877@cluster0.ej3l2.mongodb.net/?retryWrites=true&w=majority&appName=meetups"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

// export async function getServerSideProps(context) {
// const req = context.req;
// const res = context.res;

// return {
//   props: {
//     meetups: DUMMY_MEETUPS,
//   },
// };
// }
