export default function ResoucePathGenerator(prefix, resource) {
  return [
    {
      path: `${prefix}/${resource}`,
      title: `All ${resource}`,
      show: true,
      breadcrumb: false
    },
    {
      path: `${prefix}/${resource}/add`,
      title: `Add ${resource}`,
      show: true,
      breadcrumb: true
    },
    {
      path: `${prefix}/${resource}/edit/:id`,
      title: `Update ${resource}`,
      show: false,
      breadcrumb: true
    }
  ];
}
