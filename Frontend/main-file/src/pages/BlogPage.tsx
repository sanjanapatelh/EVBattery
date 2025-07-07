import AllBlogSection from "../component/blog/AllBlogSection";
import BreadcrumbSection from "../component/breadcrumb/BreadcrumbSection";
import InnerLayout from "../component/layout/InnerLayout";

const BlogPage = () => {
  return (
    <main>
      <InnerLayout>
        <BreadcrumbSection title="News & Blog" currentPage="Blog Masonry" />
        <AllBlogSection />
      </InnerLayout>
    </main>
  );
};

export default BlogPage;
