import { useParams } from "react-router-dom";
import BlogDetailSection from "../component/blog/BlogDetailSection";
import BreadcrumbSection from "../component/breadcrumb/BreadcrumbSection";
import ErrorSection from "../component/error/ErrorSection";
import InnerLayout from "../component/layout/InnerLayout";
import { blogData3 } from "../data/Data";

const BlogDetailsPage = () => {
  const { blogSlug } = useParams();

  const blogInfo = blogData3.find((item) => item.slug === blogSlug);

  return (
    <main className="rv-14-home">
      <InnerLayout>
        {blogInfo ? (
          <>
            <BreadcrumbSection title="Blog Details" />
            <BlogDetailSection
              img={blogInfo.img}
              title={blogInfo.title}
              id={blogInfo.id}
            />
          </>
        ) : (
          <ErrorSection />
        )}
      </InnerLayout>
    </main>
  );
};

export default BlogDetailsPage;
