import React from "react"
import {
    useStaticQuery
} from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const usePageSectionsQuery = () => {
    const data = useStaticQuery(graphql `
    query pageSectionsQuery {
        allFile(filter: {absolutePath: {regex: "/content/"}}) {
            edges {
            node {
                absolutePath
                name
                childMarkdownRemark {
                plainText
                frontmatter {
                    role
                }
                }
            }
            }
        }
    }
  `)
    return data.allFile.edges.map(({node}) => node.childMarkdownRemark);
}

const IndexPage = () => {
    const data = usePageSectionsQuery();
    return (
        <Layout>
            <SEO title = "Home"/>
            {data.map(({plainText, frontmatter}) => <h1 key={frontmatter.role}>{plainText}</h1>)}
        </Layout>
    )
}

export default IndexPage
