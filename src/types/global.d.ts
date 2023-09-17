/**
 * 内部全局接口可以自定义属性
 */
declare global {
  /**
   * 统一返回响应接口
   */
  interface result<T> {
    code: string | number
    msg: string
    result: T
  }

  /**
   * 通用分页参数类型
   */
  interface PageParams {
    // 页码：默认值为 1
    page: number
    // 页大小：默认值为 10
    pageSize: number
  }

  /**
   * 通用分页结果类型
   */
  interface PageResult<T> {
    // 列表数据
    items: T[]
    // 总条数
    counts: number
    // 当前页数
    page: number
    // 总页数
    pages: number
    // 每页条数
    pageSize: number
  }
}

export {}
