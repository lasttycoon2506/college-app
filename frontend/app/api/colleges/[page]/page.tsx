// app/posts/[id]/page.js
async function getPg(pg: number) {
  const res = await fetch(`http://localhost:8000/api/colleges/?page=${pg}`);
  console.log(res.json());
  return res.json();
}

export default async function GetPgResults({
  params,
}: {
  params: { pg: number };
}) {
  const { pg } = params;
  const clg = await getPg(pg);

  return (
    <div>
      <h1>{clg.name}</h1>
    </div>
  );
}

// app/posts/[id]/page.js
// async function getPost(id) {
//   const res = await fetch(`https://your-api.com/posts/${id}`);
//   return res.json();
// }

// export default async function PostPage({ params }) {
//   const { id } = params;
//   const post = await getPost(id);

//   return (
//     <div>
//       <h1>{post.title}</h1>
//       <p>{post.content}</p>
//     </div>
//   );
// }
