import React from 'react'
import PropTypes from 'prop-types'
import {List as DefaultList, Item as DefaultItem} from 'part:@sanity/components/lists/default'
import Preview from 'part:@sanity/base/preview'
import {IntentLink} from 'part:@sanity/base/router'
import schema from 'part:@sanity/base/schema'
import styles from './DocumentList.module.css'
// import DraftStatus from './DraftStatus'

export default function ReferringDocumentsList (props) {
  const {documents} = props
  console.log(documents)
  return (
    <DefaultList className={styles.root}>
      {documents.map(document => {
        const schemaType = schema.get(document._type)
        return (
          <DefaultItem className={styles.item} key={document._id}>
            {schemaType ? (
              <IntentLink
                className={styles.link}
                intent='edit'
                params={{id: document._id.replace('drafts.', ''), type: document._type}}
              >
                <Preview value={document} type={schemaType} />
                {/* document._hasDraft && <DraftStatus /> */}
              </IntentLink>
            ) : (
              <div>
                A document of the unknown type <em>{document._type}</em>
              </div>
            )}
          </DefaultItem>
        )
      })}
    </DefaultList>
  )
}

ReferringDocumentsList.propTypes = {
  documents: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      _type: PropTypes.string
    })
  )
}
