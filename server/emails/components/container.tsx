import { Link } from '@react-email/components'
import * as React from 'react'

import { styles } from '../styles'

type ContainerElement = React.ElementRef<'table'>
type RootProps = React.ComponentPropsWithoutRef<'table'>

export interface ContainerProps extends RootProps {
  unsubscribeLink?: string
}

export const Container = React.forwardRef<ContainerElement, Readonly<ContainerProps>>(
  ({ children, unsubscribeLink, ...props }, forwardedRef) => {
    return (
      <>
        <table
          align="center"
          width="100%"
          {...props}
          ref={forwardedRef}
          data-id="__react-email-container"
          role="presentation"
          cellSpacing="0"
          cellPadding="0"
          border={0}
        >
          <tbody>
            <tr style={{ width: '100%' }}>
              <td>{children}</td>
            </tr>
          </tbody>
        </table>

        {unsubscribeLink && (
          <table align="center" width="100%">
            <tbody>
              <tr style={{ width: '100%' }}>
                <td style={{ textAlign: 'center', padding: '0px 10px 40px 10px' }}>
                  <Link style={styles.unsubscribeLink} href={unsubscribeLink}>
                    Unsubscribe
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </>
    )
  },
)

Container.displayName = 'Container'
