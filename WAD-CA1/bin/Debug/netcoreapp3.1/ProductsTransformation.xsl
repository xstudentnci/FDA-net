<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">		
				<table border="3" align="center" >
					<tr>
						<th>Code</th>
						<th>Category</th>
						<th>Name</th>
						<th>Description</th>
						<th>Quantity</th>
						<th>Unit price</th>
					</tr>
					<xsl:for-each select="products/product">
						<tr>
							<td>
								<xsl:value-of select="@code"/>
							</td>
							<td>
								<xsl:value-of select="category"/>
							</td>
							<td>
								<xsl:value-of select="name"/>
							</td>
							<td>
								<xsl:value-of select="description"/>
							</td>
							<td>
								<xsl:value-of select="quantity"/>
							</td>
							<td>
								<xsl:value-of select="unitprice"/>
							</td>							
						</tr>
					</xsl:for-each>
				</table>			
	</xsl:template>
</xsl:stylesheet>
